import { NextResponse, NextRequest } from "next/server";
import { connection } from "@/db/connection";
import { User } from "@/db/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiResponse } from "@/types";
import { userLoginSchema } from "@/schema/user.schema";

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    const { success, error } = userLoginSchema.safeParse(reqBody);

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
          errors: error.issues.map((e) => e.message),
        },
        { status: 400 }
      );
    }

    await connection();

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found!!",
        },
        { status: 404 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Password!!",
        },
        { status: 400 }
      );
    }

    const token = await jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    const response = NextResponse.json(
      {
        success: true,
        message: `User with email ${user.email} login successfully!!`,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while Login User",
      },
      { status: 500 }
    );
  }
}
