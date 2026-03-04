import { NextRequest, NextResponse } from "next/server";
export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/profile") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/login") && token) {
    const redirectUrl = role === "admin" ? "/dashboard" : "/profile";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url)); 
    }
    
  }

  return NextResponse.next();
}
export const config = { matcher: ["/profile/:path*", "/login", "/dashboard/:path*"] };