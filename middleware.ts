import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  let response = NextResponse.next();

  // ---------- AUTH LOGIC ----------
  const isLoginPage = path === "/admin/login";
  const isProtectedRoute = path.startsWith("/admin") && !isLoginPage;

  const token = request.cookies.get("adminToken")?.value || "";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

  if (isLoginPage && token) {
    try {
      await jose.jwtVerify(token, secret);
      response = NextResponse.redirect(new URL("/admin", request.url));
      return response
    } catch {}
  }

  if (isProtectedRoute) {
    if (!token) {
      response = NextResponse.redirect(new URL("/admin/login", request.url));
      return response
    }

    try {
      await jose.jwtVerify(token, secret);
    } catch {
      response = NextResponse.redirect(new URL("/admin/login", request.url));
      return response
    }
  }

  // ---------- DEFAULT ----------
  return response
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};