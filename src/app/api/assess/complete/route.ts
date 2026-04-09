import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { calculateScores, type ResponseValue } from "@/lib/scoring";

export async function POST(request: Request) {
  try {
    const { assessmentId, allResponses } = await request.json();

    if (!assessmentId || !allResponses) {
      return NextResponse.json(
        { error: "assessmentId and allResponses are required" },
        { status: 400 }
      );
    }

    const result = calculateScores(allResponses as Record<string, ResponseValue>);

    const supabase = getServiceClient();

    // Save domain scores
    const domainRows = result.domainScores.map((ds) => ({
      assessment_id: assessmentId,
      domain_code: ds.domainCode,
      domain_name: ds.domainName,
      score: ds.score,
      max_points: ds.maxPoints,
      actual_points: ds.actualPoints,
      practice_count: ds.practiceCount,
      weight: ds.weight,
    }));

    const { error: domainError } = await supabase
      .from("domain_scores")
      .insert(domainRows);

    if (domainError) {
      console.error("Domain scores insert error:", domainError);
      return NextResponse.json(
        { error: "Failed to save domain scores" },
        { status: 500 }
      );
    }

    // Save individual responses
    const responseRows = Object.entries(allResponses).map(
      ([questionId, response]) => ({
        assessment_id: assessmentId,
        domain_code: questionId.split("-")[0],
        question_index: parseInt(questionId.split("-")[1]) - 1,
        response: response as string,
      })
    );

    const { error: responseError } = await supabase
      .from("assessment_responses")
      .insert(responseRows);

    if (responseError) {
      console.error("Responses insert error:", responseError);
      // Non-fatal: scores are already saved
    }

    // Update assessment record
    const { error: updateError } = await supabase
      .from("assessments")
      .update({
        overall_score: result.overallScore,
        band: result.band,
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", assessmentId);

    if (updateError) {
      console.error("Assessment update error:", updateError);
      return NextResponse.json(
        { error: "Failed to update assessment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ result, assessmentId });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
