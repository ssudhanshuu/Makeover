import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/admin/login";
  const token = request.cookies.get("admin_token")?.value || "";

  if (path.startsWith("/admin") && !isPublicPath && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.nextUrl));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/admin", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
