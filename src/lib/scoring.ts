import { domains } from "@/data/questions";

export type ResponseValue = "fully" | "partially" | "planned" | "not_started";

export interface DomainScore {
  domainCode: string;
  domainName: string;
  score: number;
  maxPoints: number;
  actualPoints: number;
  practiceCount: number;
  weight: number;
  band: string;
}

export interface AssessmentResult {
  overallScore: number;
  band: string;
  bandDescription: string;
  domainScores: DomainScore[];
  topGaps: { domain: string; score: number; recommendation: string }[];
}

const responsePoints: Record<ResponseValue, number> = {
  fully: 3,
  partially: 2,
  planned: 1,
  not_started: 0,
};

function getBand(score: number): { band: string; description: string } {
  if (score >= 90)
    return {
      band: "Assessment ready",
      description:
        "Strong position to pursue formal CMMC assessment. Focus on evidence collection and documentation polish.",
    };
  if (score >= 80)
    return {
      band: "Near ready",
      description:
        "Minor gaps remain. Target specific domains for remediation and begin preparing assessment evidence.",
    };
  if (score >= 60)
    return {
      band: "Progressing",
      description:
        "Most domains are in progress. Targeted remediation across 2-3 domains will move you to near-ready.",
    };
  if (score >= 40)
    return {
      band: "Early stage",
      description:
        "Foundation exists but significant gaps remain across multiple domains. Prioritize high-weight domains first.",
    };
  return {
    band: "Critical gaps",
    description:
      "Major remediation needed before pursuing any CMMC assessment. Start with access control and system protection.",
  };
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

export function calculateScores(
  responses: Record<string, ResponseValue>
): AssessmentResult {
  const totalPracticeWeight = domains.reduce(
    (sum, d) => sum + d.practiceCount,
    0
  );

  const domainScores: DomainScore[] = domains.map((domain) => {
    const maxPoints = domain.questions.length * 3;
    let actualPoints = 0;

    domain.questions.forEach((q) => {
      const response = responses[q.id];
      if (response) {
        actualPoints += responsePoints[response];
      }
    });

    const score = maxPoints > 0 ? (actualPoints / maxPoints) * 100 : 0;
    const weight = domain.practiceCount / totalPracticeWeight;
    const { band } = getBand(score);

    return {
      domainCode: domain.code,
      domainName: domain.name,
      score: Math.round(score * 100) / 100,
      maxPoints,
      actualPoints,
      practiceCount: domain.practiceCount,
      weight: Math.round(weight * 10000) / 10000,
      band,
    };
  });

  const overallScore = domainScores.reduce(
    (sum, ds) => sum + ds.score * ds.weight,
    0
  );
  const rounded = Math.round(overallScore * 100) / 100;
  const { band, description } = getBand(rounded);

  const topGaps = [...domainScores]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((ds) => ({
      domain: `${ds.domainCode}: ${ds.domainName}`,
      score: ds.score,
      recommendation:
        domainRecommendations[ds.domainCode] ||
        "Review and address gaps in this domain.",
    }));

  return {
    overallScore: rounded,
    band,
    bandDescription: description,
    domainScores,
    topGaps,
  };
}
