// app/api/admin/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();

    // Clear the cookie by setting it to expire immediately
    (await cookieStore).set("adminToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0, // expire immediately
      path: "/", // ensure it matches the cookie path
    });

    return NextResponse.json({ success: true, message: "Logged out successfully" }, { status: 200 });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}