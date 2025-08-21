import { NextResponse } from "next/server";
import type { MiddlewareConfig, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    console.log("No Token");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/message"],
};
