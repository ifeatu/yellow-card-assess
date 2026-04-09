import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware that protects /assess/* routes by checking subscription status.
 *
 * In production, replace the cookie/header check with your auth provider's
 * session verification (e.g. NextAuth, Clerk, Supabase).  The pattern here
 * gives you a working gate you can swap in real logic behind.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only gate /assess/* routes
  if (!pathname.startsWith("/assess")) {
    return NextResponse.next();
  }

  // ── Subscription check ───────────────────────────────────────────
  // TODO: Replace with real session/subscription lookup.
  // For now we check for a `yca_sub` cookie set after successful checkout.
  const subscriptionCookie = req.cookies.get("yca_sub")?.value;

  if (subscriptionCookie === "active") {
    return NextResponse.next();
  }

  // Allow bypass in development
  if (process.env.NODE_ENV === "development") {
    console.warn("[middleware] dev bypass — /assess route accessed without subscription");
    return NextResponse.next();
  }

  // Redirect to pricing / home when not subscribed
  const loginUrl = new URL("/?gate=subscription", req.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/assess/:path*"],
};
