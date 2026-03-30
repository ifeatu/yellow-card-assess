"use client";

import { useState } from "react";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Basic readiness scorecard",
    cta: "Start free assessment",
    ctaLink: "/assess",
    available: true,
    features: [
      "41-question readiness assessment",
      "Overall readiness score (0-100)",
      "Domain heat map (14 domains)",
      "Top 3 gap identification",
      "High-level remediation guidance",
      "Shareable results URL",
    ],
  },
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    description: "Full gap analysis with document prep",
    cta: "Join waitlist",
    ctaLink: null,
    available: false,
    features: [
      "Everything in Free",
      "Practice-level gap report (110 practices)",
      "CUI scoping wizard",
      "Boundary document export",
      "Evidence checklist per domain",
      "Exportable PDF report",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "$149",
    period: "/month",
    description: "Complete compliance toolkit",
    cta: "Join waitlist",
    ctaLink: null,
    available: false,
    highlight: true,
    features: [
      "Everything in Starter",
      "Policy document generator",
      "SSP section drafts",
      "POA&M templates",
      "Remediation tracking dashboard",
      "Reassessment comparisons",
      "Priority support",
    ],
  },
];

export default function PricingPage() {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    // In a real app, this would save to Supabase
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
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
            className="text-sm font-medium text-primary hover:text-accent transition-colors"
          >
            Start assessment
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Choose your plan
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Start free with our readiness scorecard. Upgrade when you need
            practice-level detail and compliance documents.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-white rounded-xl border p-8 flex flex-col ${
                tier.highlight
                  ? "border-accent ring-2 ring-accent/20"
                  : "border-gray-200"
              }`}
            >
              {tier.highlight && (
                <span className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-bold">{tier.name}</h3>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.period && (
                  <span className="text-muted">{tier.period}</span>
                )}
              </div>
              <p className="text-sm text-muted mb-6">{tier.description}</p>

              {tier.available ? (
                <Link
                  href={tier.ctaLink!}
                  className="block text-center bg-accent text-primary font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-colors mb-6"
                >
                  {tier.cta}
                </Link>
              ) : (
                <span className="block text-center bg-gray-100 text-muted font-medium py-3 rounded-lg mb-6">
                  Coming soon
                </span>
              )}

              <ul className="space-y-3 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <svg
                      className="w-4 h-4 text-success flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Waitlist */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center max-w-xl mx-auto">
          <h2 className="text-xl font-bold mb-2">
            Get notified when paid plans launch
          </h2>
          <p className="text-muted text-sm mb-6">
            Be the first to know when Starter and Pro plans are available.
          </p>

          {submitted ? (
            <div className="text-success font-medium py-3">
              You&apos;re on the list. We&apos;ll be in touch.
            </div>
          ) : (
            <form onSubmit={handleWaitlist} className="flex gap-2">
              <input
                type="email"
                required
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="you@company.com"
              />
              <button
                type="submit"
                className="bg-accent text-primary font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors whitespace-nowrap"
              >
                Join waitlist
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
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
