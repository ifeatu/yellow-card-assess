import Link from "next/link";

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose text-muted space-y-4">
          <p>
            Yellow Card Security collects your email address and assessment
            responses solely to deliver your CMMC readiness results. We do not
            sell, rent, or share your personal information with third parties.
          </p>
          <p>
            Assessment data is stored securely in our database and is used only
            to generate your readiness report. You may request deletion of your
            data at any time by contacting us.
          </p>
          <p>
            This privacy policy may be updated as we add new features. Please
            check back periodically.
          </p>
          <p className="text-sm">Last updated: March 2026</p>
        </div>
      </main>
    </div>
  );
}
