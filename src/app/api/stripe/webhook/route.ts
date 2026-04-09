import { NextRequest, NextResponse } from "next/server";
import { constructWebhookEvent, handleWebhookEvent } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  try {
    const event = constructWebhookEvent(body, signature);
    await handleWebhookEvent(event);
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[webhook] verification failed", err);
    return NextResponse.json({ error: "Webhook signature verification failed." }, { status: 400 });
  }
}
