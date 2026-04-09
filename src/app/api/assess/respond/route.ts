import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { assessmentId, responses } = await request.json();

    if (!assessmentId || !responses || !Array.isArray(responses)) {
      return NextResponse.json(
        { error: "assessmentId and responses array are required" },
        { status: 400 }
      );
    }

    const supabase = getServiceClient();

    const rows = responses.map(
      (r: { questionId: string; response: string; domainCode: string }) => ({
        assessment_id: assessmentId,
        domain_code: r.domainCode,
        question_index: parseInt(r.questionId.split("-")[1]) - 1,
        response: r.response,
      })
    );

    const { error } = await supabase
      .from("assessment_responses")
      .insert(rows);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save responses" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
