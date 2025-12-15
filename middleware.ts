
import { NextResponse } from "next/server";

export function middleware(req: any) {
  const token = req.cookies.get("token")?.value || "";

  const protectedRoutes = ["/dashboard", "/profile", "/my-bookings"];

  if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/my-bookings/:path*"],
};
