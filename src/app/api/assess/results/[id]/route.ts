import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Assessment ID is required" },
      { status: 400 }
    );
  }

  const supabase = getServiceClient();

  const [assessmentResult, domainScoresResult] = await Promise.all([
    supabase.from("assessments").select("*").eq("id", id).single(),
    supabase
      .from("domain_scores")
      .select("*")
      .eq("assessment_id", id)
      .order("score", { ascending: true }),
  ]);

  if (assessmentResult.error || !assessmentResult.data) {
    return NextResponse.json(
      { error: "Assessment not found" },
      { status: 404 }
    );
  }

  if (assessmentResult.data.status !== "completed") {
    return NextResponse.json(
      { error: "Assessment not yet completed" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    assessment: assessmentResult.data,
    domainScores: domainScoresResult.data || [],
  });
}
