import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { baseURL } from "./apis/axios";
import Cookies from "js-cookie";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")
    ? request.cookies.get("auth_token")?.value
    : "";

  if (
    ["/", "/login", "/authenticate", "/invite", "/earn", "/score"].includes(
      request.nextUrl.pathname
    )
  ) {
    // if user tries to access protected routes and token is not available
    if (
      !token &&
      ["/invite", "/earn", "/score", "/authenticate"].includes(
        request.nextUrl.pathname
      )
    ) {
      if (
        request.nextUrl.pathname === "/authenticate" &&
        request.nextUrl.search.startsWith("?token=")
      ) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // if token is available and user tries to access protected routes
    if (token) {
      try {
        let data = await fetch(`${baseURL}/user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        let userInfo = await data.json();

        if (
          userInfo &&
          ["/", "/login", "/authenticate", "/invite"].includes(
            request.nextUrl.pathname
          )
        ) {
          if (
            request.nextUrl.pathname !== "/login" &&
            !userInfo?.EthAddress &&
            !userInfo?.Invite?.Code
          ) {
            return NextResponse.redirect(new URL("/login", request.url));
          }

          if (
            request.nextUrl.pathname !== "/invite" &&
            userInfo?.EthAddress &&
            !userInfo?.Invite?.Code
          ) {
            return NextResponse.redirect(new URL("/invite", request.url));
          }

          if (userInfo?.EthAddress && userInfo?.Invite?.Code) {
            return NextResponse.redirect(new URL("/earn", request.url));
          }
        }

        if (
          userInfo &&
          ["/earn", "/score"].includes(request.nextUrl.pathname)
        ) {
          if (userInfo?.EthAddress && !userInfo?.Invite?.Code) {
            console.log("inside");
            return NextResponse.redirect(new URL("/invite", request.url));
          }

          if (userInfo?.EthAddress && userInfo?.Invite?.Code) {
            return NextResponse.next();
          }
        }
      } catch (error: any) {
        console.log("error", error);
        if (error?.status === 401 || error?.response?.status === 401) {
          request.cookies.clear();
          Cookies.remove("auth_token");
          localStorage.removeItem("auth_token");
        }
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public/*).*)",
    "/",
    "/login",
    "/authenticate",
    "/invite",
    "/earn",
    "/score",
  ],
};
