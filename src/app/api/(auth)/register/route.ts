import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connection } from "@/db/connection";
import { User } from "@/db/models/user.model";
import { ApiResponse } from "@/types";
import { userRegisterSchema } from "@/schema/user.schema";

export function GET() {
  return NextResponse.json(
    {
      succes: true,
    },
    { status: 200 }
  );
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    const { success, error } = userRegisterSchema.safeParse(reqBody);

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required!!",
          errors: error.issues.map((e) => e.message),
        },
        { status: 200 }
      );
    }

    await connection();

    const isUserExists = await User.findOne({
      email,
    });

    if (isUserExists) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists!!",
        },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    return NextResponse.json({
      success: true,
      message: `user with email ${user.email} register successfully`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong while Register User",
    });
  }
}
