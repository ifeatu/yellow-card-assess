"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { domains, totalQuestions } from "@/data/questions";
import type { ResponseValue } from "@/lib/scoring";

type Step = "intro" | "questions" | "submitting";

const responseOptions: { value: ResponseValue; label: string; color: string }[] = [
  { value: "fully", label: "Fully implemented", color: "bg-green-500" },
  { value: "partially", label: "Partially implemented", color: "bg-yellow-500" },
  { value: "planned", label: "Planned", color: "bg-orange-500" },
  { value: "not_started", label: "Not started", color: "bg-red-500" },
];

export default function AssessPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("intro");
  const [currentDomain, setCurrentDomain] = useState(0);
  const [email, setEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgSize, setOrgSize] = useState("");
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, ResponseValue>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const domain = domains[currentDomain];
  const answeredInDomain = domain
    ? domain.questions.filter((q) => responses[q.id]).length
    : 0;
  const totalAnswered = Object.keys(responses).length;

  async function handleStart(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/assess/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          orgName: orgName.trim() || undefined,
          orgSize: orgSize || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to start");

      setAssessmentId(data.assessmentId);
      setStep("questions");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function setResponse(questionId: string, value: ResponseValue) {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  }

  function nextDomain() {
    if (currentDomain < domains.length - 1) {
      setCurrentDomain((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function prevDomain() {
    if (currentDomain > 0) {
      setCurrentDomain((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function handleSubmit() {
    setStep("submitting");
    setLoading(true);

    try {
      const res = await fetch("/api/assess/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId,
          allResponses: responses,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to complete");

      // Brief loading state for anticipation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.push(`/results/${assessmentId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("questions");
      setLoading(false);
    }
  }

  const isLastDomain = currentDomain === domains.length - 1;

  // Intro step
  if (step === "intro") {
    return (
      <div className="min-h-screen bg-bg">
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">YC</span>
              </div>
              <span className="font-semibold text-primary text-lg">
                Yellow Card Assess
              </span>
            </div>
          </div>
        </header>

        <main className="max-w-xl mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold mb-2">CMMC Readiness Assessment</h1>
          <p className="text-muted mb-8">
            Answer {totalQuestions} questions across {domains.length} security
            domains. Takes about 10 minutes.
          </p>

          <form onSubmit={handleStart} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1"
              >
                Email address <span className="text-danger">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="orgName"
                className="block text-sm font-medium mb-1"
              >
                Organization name{" "}
                <span className="text-muted text-xs">(optional)</span>
              </label>
              <input
                id="orgName"
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Acme Defense Corp"
              />
            </div>

            <div>
              <label
                htmlFor="orgSize"
                className="block text-sm font-medium mb-1"
              >
                Approximate employee count{" "}
                <span className="text-muted text-xs">(optional)</span>
              </label>
              <select
                id="orgSize"
                value={orgSize}
                onChange={(e) => setOrgSize(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
              >
                <option value="">Select...</option>
                <option value="1-25">1-25</option>
                <option value="26-100">26-100</option>
                <option value="101-500">101-500</option>
                <option value="500+">500+</option>
              </select>
            </div>

            {error && (
              <p className="text-danger text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-primary font-semibold py-4 rounded-lg text-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Starting..." : "Begin assessment"}
            </button>
          </form>
        </main>
      </div>
    );
  }

  // Submitting step
  if (step === "submitting") {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-xl font-semibold mb-2">
            Calculating your readiness score...
          </h2>
          <p className="text-muted">
            Analyzing {totalAnswered} responses across {domains.length} domains
          </p>
        </div>
      </div>
    );
  }

  // Questions step
  return (
    <div className="min-h-screen bg-bg">
      {/* Header with progress */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">YC</span>
              </div>
              <span className="font-semibold text-primary">
                Yellow Card Assess
              </span>
            </div>
            <span className="text-sm text-muted">
              {totalAnswered} of {totalQuestions} answered
            </span>
          </div>
          {/* Progress bar */}
          <div className="flex gap-1">
            {domains.map((d, i) => {
              const domainAnswered = d.questions.filter(
                (q) => responses[q.id]
              ).length;
              const complete = domainAnswered === d.questions.length;
              const active = i === currentDomain;
              return (
                <button
                  key={d.code}
                  onClick={() => setCurrentDomain(i)}
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    complete
                      ? "bg-success"
                      : active
                      ? "bg-accent"
                      : domainAnswered > 0
                      ? "bg-warning"
                      : "bg-gray-200"
                  }`}
                  title={`${d.name} (${domainAnswered}/${d.questions.length})`}
                />
              );
            })}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Domain header */}
        <div className="mb-8">
          <p className="text-sm text-muted mb-1">
            Domain {currentDomain + 1} of {domains.length}
          </p>
          <h2 className="text-2xl font-bold capitalize">{domain.name}</h2>
          <p className="text-sm text-muted mt-1">
            {domain.practiceCount} CMMC practices &middot; {domain.questions.length}{" "}
            questions &middot; {answeredInDomain} answered
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {domain.questions.map((question) => (
            <div
              key={question.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <p className="font-medium mb-4">
                <span className="text-muted mr-2">{question.id}.</span>
                {question.text}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {responseOptions.map((option) => {
                  const selected = responses[question.id] === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setResponse(question.id, option.value)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                        selected
                          ? "border-primary bg-primary text-white"
                          : "border-gray-200 hover:border-gray-300 text-text"
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                          selected ? "bg-white" : option.color
                        }`}
                      />
                      {option.label}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted mt-2">
                Maps to: {question.mappedPractices.join(", ")}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={prevDomain}
            disabled={currentDomain === 0}
            className="px-6 py-3 text-sm font-medium text-muted hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            &larr; Previous domain
          </button>

          {isLastDomain ? (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-accent text-primary font-semibold px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
            >
              Calculate my readiness score
            </button>
          ) : (
            <button
              onClick={nextDomain}
              className="bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Next domain &rarr;
            </button>
          )}
        </div>

        {error && (
          <p className="text-danger text-sm text-center mt-4">{error}</p>
        )}
      </main>
    </div>
  );
}
