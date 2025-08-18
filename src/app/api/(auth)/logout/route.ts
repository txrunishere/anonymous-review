import { ApiResponse } from "@/types";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse<ApiResponse>> {
  try {
    const response = NextResponse.json(
      { success: true, message: "User logout successfully!!" },
      { status: 204 }
    );
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: 0,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "something went wrong while logout user!!",
      },
      {
        status: 500,
      }
    );
  }
}
