import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Yellow Card Assess <onboarding@resend.dev>",
      to: ["contact@platinumeagle.io"],
      replyTo: email,
      subject: "New waitlist signup",
      text: `${email} joined the waitlist for paid Yellow Card Assess plans.`,
    });
  } catch (err) {
    console.error("Resend error:", err);
    // Don't block the user if email fails
  }

  return NextResponse.json({ ok: true });
}
