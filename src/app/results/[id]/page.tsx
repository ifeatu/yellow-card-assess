"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface DomainScoreData {
  domain_code: string;
  domain_name: string;
  score: number;
  max_points: number;
  actual_points: number;
  practice_count: number;
  weight: number;
}

interface AssessmentData {
  id: string;
  email: string;
  org_name: string | null;
  overall_score: number;
  band: string;
  status: string;
  completed_at: string;
}

const domainRecommendations: Record<string, string> = {
  AC: "Implement role-based access controls, enforce MFA for all remote and privileged access, and document your access control policies.",
  AT: "Establish a formal security awareness training program with regular cadence and insider threat training for all personnel.",
  AU: "Deploy centralized logging, protect audit trails from tampering, and establish a review process for anomalous activity.",
  CM: "Create a baseline configuration inventory, establish a change control process, and restrict unauthorized software.",
  IA: "Enforce MFA across all privileged and network accounts, implement password complexity policies, and automate account deactivation.",
  IR: "Develop and document an incident response plan, train your team, and test it through tabletop exercises at least annually.",
  MA: "Formalize maintenance procedures, sanitize equipment before offsite repair, and control diagnostic tools.",
  MP: "Classify all media containing CUI, apply required markings, enforce encryption during transport, and sanitize before disposal.",
  PE: "Restrict physical access to CUI processing areas, log all physical entry, and implement visitor escort procedures.",
  PS: "Screen personnel before CUI access, revoke access immediately upon termination, and recover all credentials and equipment.",
  RA: "Conduct periodic risk assessments, implement continuous vulnerability scanning, and maintain a remediation tracking process.",
  CA: "Establish periodic security control assessments, document findings, and maintain an active plan of action and milestones.",
  SC: "Implement boundary protections, encrypt CUI at rest and in transit, segment CUI networks, and enforce deny-by-default rules.",
  SI: "Patch systems promptly, deploy endpoint protection, monitor for indicators of compromise, and act on security advisories.",
};

function getBandDescription(band: string): string {
  const descriptions: Record<string, string> = {
    "Assessment ready":
      "Strong position to pursue formal CMMC assessment. Focus on evidence collection and documentation polish.",
    "Near ready":
      "Minor gaps remain. Target specific domains for remediation and begin preparing assessment evidence.",
    Progressing:
      "Most domains are in progress. Targeted remediation across 2-3 domains will move you to near-ready.",
    "Early stage":
      "Foundation exists but significant gaps remain across multiple domains. Prioritize high-weight domains first.",
    "Critical gaps":
      "Major remediation needed before pursuing any CMMC assessment. Start with access control and system protection.",
  };
  return descriptions[band] || "";
}

function scoreColor(score: number): string {
  if (score >= 90) return "bg-green-500";
  if (score >= 80) return "bg-green-400";
  if (score >= 60) return "bg-yellow-400";
  if (score >= 40) return "bg-orange-400";
  return "bg-red-500";
}

function scoreBgColor(score: number): string {
  if (score >= 90) return "bg-green-50 border-green-200";
  if (score >= 80) return "bg-green-50 border-green-100";
  if (score >= 60) return "bg-yellow-50 border-yellow-200";
  if (score >= 40) return "bg-orange-50 border-orange-200";
  return "bg-red-50 border-red-200";
}

function scoreTextColor(score: number): string {
  if (score >= 80) return "text-green-700";
  if (score >= 60) return "text-yellow-700";
  if (score >= 40) return "text-orange-700";
  return "text-red-700";
}

function bandColor(band: string): string {
  if (band === "Assessment ready") return "text-green-600";
  if (band === "Near ready") return "text-green-500";
  if (band === "Progressing") return "text-yellow-600";
  if (band === "Early stage") return "text-orange-500";
  return "text-red-600";
}

function gaugeStrokeColor(score: number): string {
  if (score >= 90) return "#22c55e";
  if (score >= 80) return "#4ade80";
  if (score >= 60) return "#facc15";
  if (score >= 40) return "#fb923c";
  return "#ef4444";
}

export default function ResultsPage() {
  const params = useParams();
  const id = params.id as string;

  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [domainScores, setDomainScores] = useState<DomainScoreData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch(`/api/assess/results/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load results");
        setAssessment(data.assessment);
        setDomainScores(data.domainScores);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !assessment) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            {error || "Assessment not found"}
          </h2>
          <Link href="/" className="text-accent hover:underline">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const score = Math.round(assessment.overall_score);
  const topGaps = [...domainScores].sort((a, b) => a.score - b.score).slice(0, 3);

  // SVG gauge
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm">YC</span>
            </div>
            <span className="font-semibold text-primary text-lg">
              Yellow Card Assess
            </span>
          </Link>
          <Link
            href="/assess"
            className="text-sm font-medium text-accent hover:underline"
          >
            Take again
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Score Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Gauge */}
            <div className="relative flex-shrink-0">
              <svg width="180" height="180" viewBox="0 0 180 180">
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                />
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="none"
                  stroke={gaugeStrokeColor(score)}
                  strokeWidth="12"
                  strokeDasharray={`${progress} ${circumference}`}
                  strokeLinecap="round"
                  transform="rotate(-90 90 90)"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{score}</span>
                <span className="text-sm text-muted">out of 100</span>
              </div>
            </div>

            {/* Band info */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">Your CMMC Readiness</h1>
              <p className={`text-xl font-semibold mb-3 ${bandColor(assessment.band)}`}>
                {assessment.band}
              </p>
              <p className="text-muted max-w-lg">
                {getBandDescription(assessment.band)}
              </p>
              {assessment.org_name && (
                <p className="text-sm text-muted mt-4">
                  Assessment for {assessment.org_name}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Domain Heat Map */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Domain Heat Map</h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
            {[...domainScores]
              .sort((a, b) => a.score - b.score)
              .map((ds) => (
                <div
                  key={ds.domain_code}
                  className={`rounded-lg border p-3 ${scoreBgColor(ds.score)}`}
                >
                  <p className="font-bold text-sm">{ds.domain_code}</p>
                  <p className="text-xs text-muted capitalize truncate">
                    {ds.domain_name}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${scoreColor(
                        ds.score
                      )}`}
                    />
                    <span
                      className={`text-lg font-bold ${scoreTextColor(
                        ds.score
                      )}`}
                    >
                      {Math.round(ds.score)}%
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    {ds.practice_count} practices
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Top 3 Gaps */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Top Gaps</h2>
          <div className="space-y-4">
            {topGaps.map((ds, i) => (
              <div
                key={ds.domain_code}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-sm font-medium text-muted">
                      Gap #{i + 1}
                    </span>
                    <h3 className="text-lg font-semibold capitalize">
                      {ds.domain_code}: {ds.domain_name}
                    </h3>
                  </div>
                  <span
                    className={`text-2xl font-bold ${scoreTextColor(ds.score)}`}
                  >
                    {Math.round(ds.score)}%
                  </span>
                </div>
                {/* Score bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                  <div
                    className={`h-2 rounded-full ${scoreColor(ds.score)}`}
                    style={{ width: `${Math.max(ds.score, 2)}%` }}
                  />
                </div>
                <p className="text-muted text-sm leading-relaxed">
                  {domainRecommendations[ds.domain_code] ||
                    "Review and address gaps in this domain."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Want the full gap report with practice-level detail?
          </h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Coming soon: Yellow Card Assess Pro with full gap reports, CUI
            scoping wizard, boundary document export, policy generator, SSP
            sections, and POA&amp;M templates.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-accent text-primary font-semibold px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            See pricing
          </Link>
        </div>

        {/* Share */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted mb-2">Share your results</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                const text = `I scored ${score}/100 on my CMMC readiness assessment. Check yours:`;
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    window.location.href
                  )}&summary=${encodeURIComponent(text)}`,
                  "_blank"
                );
              }}
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              Share on LinkedIn
            </button>
            <button
              onClick={() => {
                const subject = `My CMMC Readiness Score: ${score}/100`;
                const body = `I just took the Yellow Card CMMC readiness assessment and scored ${score}/100 (${assessment.band}).\n\nTake yours: ${window.location.origin}/assess`;
                window.location.href = `mailto:?subject=${encodeURIComponent(
                  subject
                )}&body=${encodeURIComponent(body)}`;
              }}
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              Share via email
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 px-4 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Yellow Card Security
          </span>
          <div className="flex gap-6 text-sm text-muted">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
