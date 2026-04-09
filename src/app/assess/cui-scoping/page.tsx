"use client";

import { useState } from "react";

// ── CUI Categories (NIST SP 800-171 families) ───────────────────────
const CUI_CATEGORIES = [
  { id: "ctd", label: "Controlled Technical Information (CTI)" },
  { id: "itar", label: "ITAR / Export Controlled" },
  { id: "phi", label: "Protected Health Information (PHI)" },
  { id: "pii", label: "Personally Identifiable Information (PII)" },
  { id: "fedcon", label: "Federal Contract Information (FCI)" },
  { id: "propri", label: "Proprietary Business Information" },
  { id: "legal", label: "Legal / Law Enforcement Sensitive" },
  { id: "critical", label: "Critical Infrastructure" },
] as const;

// ── NIST 800-171 Control Families ────────────────────────────────────
const CONTROL_FAMILIES = [
  { id: "ac", label: "Access Control (AC)", count: 22 },
  { id: "at", label: "Awareness & Training (AT)", count: 3 },
  { id: "au", label: "Audit & Accountability (AU)", count: 9 },
  { id: "cm", label: "Configuration Management (CM)", count: 9 },
  { id: "ia", label: "Identification & Authentication (IA)", count: 11 },
  { id: "ir", label: "Incident Response (IR)", count: 3 },
  { id: "ma", label: "Maintenance (MA)", count: 6 },
  { id: "mp", label: "Media Protection (MP)", count: 8 },
  { id: "pe", label: "Physical & Environmental Protection (PE)", count: 6 },
  { id: "ps", label: "Personnel Security (PS)", count: 2 },
  { id: "ra", label: "Risk Assessment (RA)", count: 3 },
  { id: "ca", label: "Security Assessment (CA)", count: 4 },
  { id: "sc", label: "System & Communications Protection (SC)", count: 16 },
  { id: "si", label: "System & Information Integrity (SI)", count: 7 },
] as const;

type Step = 1 | 2 | 3 | 4 | "result";

interface RoleMapping {
  role: string;
  responsibilities: string;
}

export default function CuiScopingPage() {
  const [step, setStep] = useState<Step>(1);

  // Step 1
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());

  // Step 2
  const [boundaryName, setBoundaryName] = useState("");
  const [boundaryDescription, setBoundaryDescription] = useState("");

  // Step 3
  const [roles, setRoles] = useState<RoleMapping[]>([
    { role: "System Administrator", responsibilities: "" },
    { role: "Security Officer", responsibilities: "" },
    { role: "End User", responsibilities: "" },
  ]);

  // Step 4
  const [implementedControls, setImplementedControls] = useState<Set<string>>(new Set());

  function toggleCategory(id: string) {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleControl(id: string) {
    setImplementedControls((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function updateRole(index: number, field: keyof RoleMapping, value: string) {
    setRoles((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  }

  function addRole() {
    setRoles((prev) => [...prev, { role: "", responsibilities: "" }]);
  }

  function generateScopingStatement(): string {
    const cats = Array.from(selectedCategories)
      .map((id) => CUI_CATEGORIES.find((c) => c.id === id)?.label)
      .filter(Boolean)
      .join(", ");
    const controlCount = implementedControls.size;
    const totalControls = CONTROL_FAMILIES.reduce((sum, f) => sum + f.count, 0);
    const roleList = roles.filter((r) => r.role.trim()).map((r) => r.role).join(", ");

    return [
      `CMMC CUI Scoping Statement`,
      `==========================`,
      ``,
      `System Boundary: ${boundaryName || "(unnamed)"}`,
      boundaryDescription ? `Description: ${boundaryDescription}` : "",
      ``,
      `CUI Categories in Scope:`,
      cats ? `  ${cats}` : "  (none selected)",
      ``,
      `Roles with CUI Access:`,
      `  ${roleList || "(none defined)"}`,
      ``,
      `Control Implementation Status:`,
      `  ${controlCount} of ${totalControls} controls currently implemented (${Math.round((controlCount / totalControls) * 100)}%)`,
      ``,
      `Assessment Readiness: ${controlCount >= totalControls * 0.8 ? "HIGH" : controlCount >= totalControls * 0.5 ? "MEDIUM" : "LOW"}`,
    ]
      .filter((line) => line !== "")
      .join("\n");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">CUI Scoping Wizard</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Define your CUI boundary, map roles, and assess current controls.
      </p>

      {/* ── Progress bar ──────────────────────────────────────── */}
      <div className="flex gap-2 mb-10">
        {([1, 2, 3, 4] as const).map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded ${
              step === "result" || s <= (step as number)
                ? "bg-blue-600"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>

      {/* ── Step 1: CUI Categories ────────────────────────────── */}
      {step === 1 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Step 1: CUI Categories</h2>
          <p className="text-sm text-gray-500 mb-4">
            Select all CUI categories that your system stores, processes, or transmits.
          </p>
          <div className="space-y-3">
            {CUI_CATEGORIES.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.has(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  className="h-5 w-5 rounded"
                />
                <span>{cat.label}</span>
              </label>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={selectedCategories.size === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-40"
            >
              Next: System Boundary
            </button>
          </div>
        </section>
      )}

      {/* ── Step 2: System Boundary ───────────────────────────── */}
      {step === 2 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Step 2: System Boundary</h2>
          <p className="text-sm text-gray-500 mb-4">
            Define the information system boundary where CUI resides.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">System / Enclave Name</label>
              <input
                type="text"
                value={boundaryName}
                onChange={(e) => setBoundaryName(e.target.value)}
                placeholder="e.g. ACME-CUI-Enclave-01"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Boundary Description</label>
              <textarea
                value={boundaryDescription}
                onChange={(e) => setBoundaryDescription(e.target.value)}
                rows={4}
                placeholder="Describe the network segments, cloud accounts, and physical locations included in this boundary..."
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 bg-transparent"
              />
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Coming soon:</strong> Interactive system boundary diagram builder with
                drag-and-drop network topology mapping.
              </p>
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <button onClick={() => setStep(1)} className="px-6 py-2 border rounded-lg">
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!boundaryName.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-40"
            >
              Next: Role Mapping
            </button>
          </div>
        </section>
      )}

      {/* ── Step 3: Role Mapping ──────────────────────────────── */}
      {step === 3 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Step 3: Role Mapping</h2>
          <p className="text-sm text-gray-500 mb-4">
            Map roles that interact with CUI and their responsibilities.
          </p>
          <div className="space-y-4">
            {roles.map((role, i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={role.role}
                  onChange={(e) => updateRole(i, "role", e.target.value)}
                  placeholder="Role title"
                  className="rounded-lg border border-gray-300 dark:border-gray-600 p-3 bg-transparent"
                />
                <input
                  type="text"
                  value={role.responsibilities}
                  onChange={(e) => updateRole(i, "responsibilities", e.target.value)}
                  placeholder="CUI responsibilities"
                  className="rounded-lg border border-gray-300 dark:border-gray-600 p-3 bg-transparent"
                />
              </div>
            ))}
            <button
              onClick={addRole}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              + Add another role
            </button>
          </div>
          <div className="mt-8 flex justify-between">
            <button onClick={() => setStep(2)} className="px-6 py-2 border rounded-lg">
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              Next: Current Controls
            </button>
          </div>
        </section>
      )}

      {/* ── Step 4: Controls Checklist ────────────────────────── */}
      {step === 4 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Step 4: Current Controls</h2>
          <p className="text-sm text-gray-500 mb-4">
            Check control families where you have implemented controls.
          </p>
          <div className="space-y-3">
            {CONTROL_FAMILIES.map((fam) => (
              <label
                key={fam.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={implementedControls.has(fam.id)}
                    onChange={() => toggleControl(fam.id)}
                    className="h-5 w-5 rounded"
                  />
                  <span>{fam.label}</span>
                </div>
                <span className="text-xs text-gray-400">{fam.count} controls</span>
              </label>
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            <button onClick={() => setStep(3)} className="px-6 py-2 border rounded-lg">
              Back
            </button>
            <button
              onClick={() => setStep("result")}
              className="px-6 py-2 bg-green-600 text-white rounded-lg"
            >
              Generate Scoping Statement
            </button>
          </div>
        </section>
      )}

      {/* ── Result ────────────────────────────────────────────── */}
      {step === "result" && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Scoping Statement</h2>
          <pre className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-sm font-mono leading-relaxed">
            {generateScopingStatement()}
          </pre>
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2 border rounded-lg"
            >
              Start Over
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generateScopingStatement());
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              Copy to Clipboard
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
