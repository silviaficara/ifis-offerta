import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { deriveAuthToken, timingSafeCompare } from "@/lib/auth/token";

export async function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/login") {
    return NextResponse.next();
  }

  const secret = process.env.SITE_PASSWORD;
  if (!secret) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  const cookie = request.cookies.get("site-auth")?.value ?? "";
  const expected = await deriveAuthToken(secret);

  if (timingSafeCompare(cookie, expected)) {
    return NextResponse.next();
  }

  const url = new URL("/login", request.url);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.).*)"],
};
