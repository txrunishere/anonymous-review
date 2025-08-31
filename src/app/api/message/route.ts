import { NextResponse, NextRequest } from "next/server";
import { connection } from "@/db/connection";
import { ApiResponse } from "@/types";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/db/models/user.model";

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const tokenData = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload & { id: string };

    await connection();

    const user = await User.findById(tokenData.id)
      .select("-password")
      ?.populate("reviews");

    // const reviews = user?.populate("reviews");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Valid Token", user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong while get user details!!",
    });
  }
}
