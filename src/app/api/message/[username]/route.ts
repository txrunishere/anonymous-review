import { connection } from "@/db/connection";
import { Review } from "@/db/models/reviews.model";
import { User } from "@/db/models/user.model";
import { ApiResponse } from "@/types";
import { NextResponse, NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
): Promise<NextResponse<ApiResponse>> {
  try {
    const { username } = await params;
    const { content } = await req.json();

    if (!username) {
      return NextResponse.json({
        success: false,
        message: "Username is required!!",
      });
    }

    await connection();

    const user = await User.findOne({
      username,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found!!",
        },
        { status: 400 }
      );
    }

    const review = await Review.create({
      content,
    });

    if (review) {
      const updatedUser = await User.findByIdAndUpdate(user.id, {
        $push: {
          reviews: review,
        },
      });

      if (updatedUser) {
        return NextResponse.json(
          { success: true, message: "Review add successfully!" },
          { status: 200 }
        );
      } else {
        await Review.findByIdAndDelete(review._id);
        return NextResponse.json(
          { success: false, message: "Something went wrong while update user" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong while create review",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while update user's reviews",
      },
      { status: 500 }
    );
  }
}
