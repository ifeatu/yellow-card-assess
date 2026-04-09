import Stripe from "stripe";

// ── Server-side Stripe client ────────────────────────────────────────
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
});

// ── Product & Price Configuration ────────────────────────────────────
export const PRODUCT = {
  name: "Yellow Card Assess Pro",
  description:
    "CMMC self-assessment suite with CUI scoping, policy generation, and gap analysis.",
} as const;

export const PRICES = {
  monthly: {
    id: process.env.STRIPE_PRICE_MONTHLY_ID!,
    amount: 4900, // $49.00
    interval: "month" as const,
    label: "$49/mo",
  },
  yearly: {
    id: process.env.STRIPE_PRICE_YEARLY_ID!,
    amount: 47000, // $470.00
    interval: "year" as const,
    label: "$470/yr",
  },
} as const;

export type PricingInterval = keyof typeof PRICES;

// ── Checkout Session ─────────────────────────────────────────────────
export async function createCheckoutSession({
  priceId,
  customerId,
  successUrl,
  cancelUrl,
}: {
  priceId: string;
  customerId?: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<Stripe.Checkout.Session> {
  return stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    ...(customerId ? { customer: customerId } : {}),
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { product: PRODUCT.name },
  });
}

// ── Customer Portal ──────────────────────────────────────────────────
export async function createPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}): Promise<Stripe.BillingPortal.Session> {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

// ── Webhook Helpers ──────────────────────────────────────────────────
export function constructWebhookEvent(
  body: string | Buffer,
  signature: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
}

/** Relevant webhook event types for subscription lifecycle */
export const WEBHOOK_EVENTS = [
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "invoice.payment_succeeded",
  "invoice.payment_failed",
] as const;

export type WebhookEventType = (typeof WEBHOOK_EVENTS)[number];

/**
 * Skeleton handler — wire this up to your database / auth provider.
 * Each case should persist subscription status so middleware can gate access.
 */
export async function handleWebhookEvent(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      // TODO: Provision access — link session.customer + session.subscription to your user record
      console.log("[stripe] checkout completed", session.id);
      break;
    }
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      // TODO: Update subscription status in DB (active, past_due, canceled, etc.)
      console.log("[stripe] subscription updated", sub.id, sub.status);
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      // TODO: Revoke access — mark user as free-tier
      console.log("[stripe] subscription deleted", sub.id);
      break;
    }
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      console.log("[stripe] payment succeeded", invoice.id);
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      // TODO: Notify user, start grace period
      console.log("[stripe] payment failed", invoice.id);
      break;
    }
    default:
      console.log("[stripe] unhandled event", event.type);
  }
}
