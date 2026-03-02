import { NextRequest, NextResponse } from "next/server";
export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/profile") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/login") && token) {
    const redirectUrl = role === "admin" ? "/admin" : "/profile";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url)); // تحويل المستخدم العادي للصفحة الرئيسية
    }
    
  }

  return NextResponse.next();
}
export const config = { matcher: ["/profile/:path*", "/login", "/admin/:path*"] };