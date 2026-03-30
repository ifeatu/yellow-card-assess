import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm">YC</span>
            </div>
            <span className="font-semibold text-primary text-lg">
              Yellow Card Assess
            </span>
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="prose text-muted space-y-4">
          <p>
            Yellow Card Assess is a free self-assessment tool provided for
            informational purposes only. It is not a substitute for a formal
            CMMC assessment conducted by a Certified Third-Party Assessment
            Organization (C3PAO).
          </p>
          <p>
            The readiness score and recommendations provided are based on your
            self-reported answers and may not reflect your actual compliance
            posture. Yellow Card Security makes no guarantees regarding the
            accuracy or completeness of the assessment results.
          </p>
          <p>
            By using this tool, you agree that Yellow Card Security is not
            liable for any decisions made based on assessment results.
          </p>
          <p className="text-sm">Last updated: March 2026</p>
        </div>
      </main>
    </div>
  );
}
