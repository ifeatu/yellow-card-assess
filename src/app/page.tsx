import Link from "next/link";

function ClipboardIcon() {
  return (
    <svg
      className="w-8 h-8 text-accent"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      className="w-8 h-8 text-accent"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg
      className="w-8 h-8 text-accent"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm">YC</span>
            </div>
            <span className="font-semibold text-primary text-lg">
              Yellow Card Assess
            </span>
          </div>
          <Link
            href="/assess"
            className="text-sm font-medium text-primary hover:text-accent transition-colors"
          >
            Start assessment
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Is your company ready for CMMC?
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Find out in 10 minutes. Free readiness scorecard for defense
            contractors.
          </p>
          <Link
            href="/assess"
            className="inline-block bg-accent text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-yellow-500 transition-colors"
          >
            Start your assessment
          </Link>
          <p className="text-sm text-gray-400 mt-4">
            No account required. Results delivered instantly.
          </p>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <div className="mb-4">
                <ClipboardIcon />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                41 questions across 14 CMMC domains
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Covers all 110 CMMC Level 2 practices mapped to the 14 security
                domains in NIST SP 800-171.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <div className="mb-4">
                <ChartIcon />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Instant readiness score with domain heat map
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                See your overall readiness score and a color-coded breakdown
                showing exactly which domains need attention.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <div className="mb-4">
                <TargetIcon />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Prioritized gap analysis with remediation guidance
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Get your top 3 gaps identified with actionable recommendations
                to improve your security posture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-white py-16 px-4 border-y border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <svg
            className="w-8 h-8 text-accent mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <p className="text-muted leading-relaxed mt-4">
            Built by cybersecurity professionals with 17+ years of experience
            advising Fortune 500 companies and defense contractors on CMMC, NIST
            800-171, HIPAA, and SOC 2 compliance.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to find out where you stand?
          </h2>
          <p className="text-muted mb-8">
            Takes about 10 minutes. No signup required.
          </p>
          <Link
            href="/assess"
            className="inline-block bg-accent text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-yellow-500 transition-colors"
          >
            Start your assessment
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xs">YC</span>
            </div>
            <span className="text-sm text-muted">
              &copy; {new Date().getFullYear()} Yellow Card Security. All rights
              reserved.
            </span>
          </div>
          <div className="flex gap-6 text-sm text-muted">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/pricing" className="hover:text-primary transition-colors">
              Pricing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
