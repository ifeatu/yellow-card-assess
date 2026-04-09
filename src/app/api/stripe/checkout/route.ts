import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, PRICES, type PricingInterval } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { interval, customerId } = (await req.json()) as {
      interval: PricingInterval;
      customerId?: string;
    };

    const price = PRICES[interval];
    if (!price) {
      return NextResponse.json(
        { error: "Invalid pricing interval. Use 'monthly' or 'yearly'." },
        { status: 400 }
      );
    }

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const session = await createCheckoutSession({
      priceId: price.id,
      customerId,
      successUrl: `${origin}/assess/cui-scoping?checkout=success`,
      cancelUrl: `${origin}/?checkout=canceled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] error", err);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
