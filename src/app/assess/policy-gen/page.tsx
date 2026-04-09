"use client";

import { useState } from "react";

const POLICY_TEMPLATES = [
  {
    id: "access-control",
    name: "Access Control Policy",
    family: "AC",
    description: "Defines how the organization manages access to CUI systems, including account management, access enforcement, and least privilege.",
    sections: [
      { title: "Purpose", placeholder: "This policy establishes access control requirements for systems processing, storing, or transmitting CUI for {organization_name}." },
      { title: "Scope", placeholder: "This policy applies to all {organization_name} personnel, contractors, and third parties who access systems containing CUI." },
      { title: "Account Management", placeholder: "The organization shall:\n- Identify and select account types (individual, group, system, application)\n- Assign account managers\n- Establish conditions for group and role membership\n- Authorize access based on valid need-to-know and assigned duties" },
      { title: "Access Enforcement", placeholder: "The information system shall enforce approved authorizations for logical access to information and system resources." },
      { title: "Least Privilege", placeholder: "The organization shall employ the principle of least privilege, allowing only authorized accesses necessary to accomplish assigned tasks." },
    ],
  },
  {
    id: "incident-response",
    name: "Incident Response Policy",
    family: "IR",
    description: "Establishes the organization's approach to detecting, reporting, and responding to cybersecurity incidents involving CUI.",
    sections: [
      { title: "Purpose", placeholder: "This policy establishes incident response capabilities for {organization_name} to detect, respond to, and recover from cybersecurity incidents." },
      { title: "Scope", placeholder: "This policy applies to all information systems that process, store, or transmit CUI." },
      { title: "Incident Handling", placeholder: "The organization shall implement an incident handling capability that includes:\n- Preparation\n- Detection and analysis\n- Containment, eradication, and recovery\n- Post-incident activity" },
      { title: "Incident Reporting", placeholder: "The organization shall report incidents to {reporting_authority} within {timeframe} of discovery." },
      { title: "Incident Response Testing", placeholder: "The organization shall test incident response capabilities at least annually." },
    ],
  },
  {
    id: "sc-protection",
    name: "System & Communications Protection Policy",
    family: "SC",
    description: "Defines requirements for protecting communications and system boundaries, including encryption, boundary protection, and session management.",
    sections: [
      { title: "Purpose", placeholder: "This policy establishes system and communications protection requirements for systems processing CUI at {organization_name}." },
      { title: "Scope", placeholder: "This policy applies to all network communications and system boundaries involving CUI." },
      { title: "Boundary Protection", placeholder: "The organization shall monitor and control communications at external boundaries and key internal boundaries of information systems." },
      { title: "Encryption", placeholder: "The organization shall implement FIPS-validated cryptographic mechanisms to prevent unauthorized disclosure of CUI during transmission and at rest." },
      { title: "Session Management", placeholder: "The information system shall terminate sessions after {timeout_minutes} minutes of inactivity." },
    ],
  },
];

export default function PolicyGenPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [orgName, setOrgName] = useState("");
  const [sectionValues, setSectionValues] = useState<Record<string, string>>({});

  const template = POLICY_TEMPLATES.find((t) => t.id === selectedTemplate);

  const handleSectionChange = (title: string, value: string) => {
    setSectionValues((prev) => ({ ...prev, [`${selectedTemplate}_${title}`]: value }));
  };

  const getSectionValue = (title: string, placeholder: string) => {
    const key = `${selectedTemplate}_${title}`;
    return sectionValues[key] ?? placeholder.replace(/\{organization_name\}/g, orgName || "{organization_name}");
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Policy Generator</h1>
      <p className="text-gray-600 mb-6">
        Generate CMMC Level 2 compliance policies from templates. Fill in your organization details
        and customize each section.
      </p>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Organization Name</label>
        <input
          type="text"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          placeholder="Acme Corporation"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {!selectedTemplate ? (
        <div className="grid gap-4 md:grid-cols-3">
          {POLICY_TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTemplate(t.id)}
              className="text-left border rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <div className="font-semibold">{t.name}</div>
              <div className="text-xs text-gray-500 mb-2">Family: {t.family}</div>
              <div className="text-sm text-gray-600">{t.description}</div>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedTemplate(null)}
            className="text-blue-600 hover:underline mb-4 inline-block"
          >
            ← Back to templates
          </button>
          <h2 className="text-2xl font-bold mb-4">{template?.name}</h2>

          <div className="space-y-6">
            {template?.sections.map((section) => (
              <div key={section.title} className="border rounded-lg p-4">
                <label className="block font-medium mb-2">{section.title}</label>
                <textarea
                  rows={5}
                  value={getSectionValue(section.title, section.placeholder)}
                  onChange={(e) => handleSectionChange(section.title, e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm font-mono"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Download PDF (coming soon)
            </button>
            <button className="border px-6 py-2 rounded-lg hover:bg-gray-50">
              Copy to Clipboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
