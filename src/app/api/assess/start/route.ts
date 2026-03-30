import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email, orgName, orgSize } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const supabase = getServiceClient();

    const { data, error } = await supabase
      .from("assessments")
      .insert({
        email: email.trim().toLowerCase(),
        org_name: orgName || null,
        org_size: orgSize || null,
        status: "in_progress",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to create assessment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ assessmentId: data.id });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
