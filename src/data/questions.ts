export interface Question {
  id: string;
  text: string;
  domainCode: string;
  mappedPractices: string[];
}

export interface Domain {
  code: string;
  name: string;
  practiceCount: number;
  questions: Question[];
}

export const domains: Domain[] = [
  {
    code: "AC",
    name: "Access control",
    practiceCount: 22,
    questions: [
      {
        id: "AC-1",
        text: "Do you restrict system access to authorized users only?",
        domainCode: "AC",
        mappedPractices: ["AC.L2-3.1.1", "AC.L2-3.1.2"]
      },
      {
        id: "AC-2",
        text: "Do you limit access to the types of transactions and functions that authorized users are permitted to execute?",
        domainCode: "AC",
        mappedPractices: ["AC.L2-3.1.2", "AC.L2-3.1.5"]
      },
      {
        id: "AC-3",
        text: "Do you control the flow of CUI in accordance with approved authorizations?",
        domainCode: "AC",
        mappedPractices: ["AC.L2-3.1.3"]
      },
      {
        id: "AC-4",
        text: "Do you use multi-factor authentication for network and remote access?",
        domainCode: "AC",
        mappedPractices: ["AC.L2-3.1.7", "AC.L2-3.1.12"]
      },
      {
        id: "AC-5",
        text: "Do you encrypt CUI on mobile devices and during remote access sessions?",
        domainCode: "AC",
        mappedPractices: ["AC.L2-3.1.19"]
      }
    ]
  },
  {
    code: "AT",
    name: "Awareness and training",
    practiceCount: 3,
    questions: [
      {
        id: "AT-1",
        text: "Do you provide security awareness training to all users, including managers and senior executives?",
        domainCode: "AT",
        mappedPractices: ["AT.L2-3.2.1", "AT.L2-3.2.2"]
      },
      {
        id: "AT-2",
        text: "Do you train personnel on recognizing and reporting potential insider threats?",
        domainCode: "AT",
        mappedPractices: ["AT.L2-3.2.3"]
      }
    ]
  },
  {
    code: "AU",
    name: "Audit and accountability",
    practiceCount: 9,
    questions: [
      {
        id: "AU-1",
        text: "Do you create, protect, and retain system audit logs?",
        domainCode: "AU",
        mappedPractices: ["AU.L2-3.3.1", "AU.L2-3.3.4"]
      },
      {
        id: "AU-2",
        text: "Do you review and analyze audit logs for indicators of unauthorized activity?",
        domainCode: "AU",
        mappedPractices: ["AU.L2-3.3.5"]
      },
      {
        id: "AU-3",
        text: "Can you trace actions to individual users with no shared accounts on CUI systems?",
        domainCode: "AU",
        mappedPractices: ["AU.L2-3.3.2"]
      }
    ]
  },
  {
    code: "CM",
    name: "Configuration management",
    practiceCount: 9,
    questions: [
      {
        id: "CM-1",
        text: "Do you maintain a baseline configuration and inventory of your IT systems?",
        domainCode: "CM",
        mappedPractices: ["CM.L2-3.4.1", "CM.L2-3.4.2"]
      },
      {
        id: "CM-2",
        text: "Do you control and monitor user-installed software?",
        domainCode: "CM",
        mappedPractices: ["CM.L2-3.4.9"]
      },
      {
        id: "CM-3",
        text: "Do you restrict, disable, or prevent the use of nonessential programs and functions?",
        domainCode: "CM",
        mappedPractices: ["CM.L2-3.4.7", "CM.L2-3.4.8"]
      }
    ]
  },
  {
    code: "IA",
    name: "Identification and authentication",
    practiceCount: 11,
    questions: [
      {
        id: "IA-1",
        text: "Do you identify and authenticate all users, processes, and devices before granting access to CUI systems?",
        domainCode: "IA",
        mappedPractices: ["IA.L2-3.5.1", "IA.L2-3.5.2"]
      },
      {
        id: "IA-2",
        text: "Do you enforce minimum password complexity and change requirements?",
        domainCode: "IA",
        mappedPractices: ["IA.L2-3.5.7", "IA.L2-3.5.8"]
      },
      {
        id: "IA-3",
        text: "Do you use MFA for local and network access to privileged accounts?",
        domainCode: "IA",
        mappedPractices: ["IA.L2-3.5.3"]
      },
      {
        id: "IA-4",
        text: "Do you disable identifiers after a defined period of inactivity?",
        domainCode: "IA",
        mappedPractices: ["IA.L2-3.5.6"]
      }
    ]
  },
  {
    code: "IR",
    name: "Incident response",
    practiceCount: 3,
    questions: [
      {
        id: "IR-1",
        text: "Do you have an operational incident response capability with a documented plan, trained team, and regular testing?",
        domainCode: "IR",
        mappedPractices: ["IR.L2-3.6.1", "IR.L2-3.6.2"]
      },
      {
        id: "IR-2",
        text: "Do you report incidents to appropriate authorities and track/document them?",
        domainCode: "IR",
        mappedPractices: ["IR.L2-3.6.3"]
      }
    ]
  },
  {
    code: "MA",
    name: "Maintenance",
    practiceCount: 6,
    questions: [
      {
        id: "MA-1",
        text: "Do you perform maintenance on IT systems using approved, authorized processes?",
        domainCode: "MA",
        mappedPractices: ["MA.L2-3.7.1", "MA.L2-3.7.2"]
      },
      {
        id: "MA-2",
        text: "Do you sanitize equipment removed for off-site maintenance to remove CUI?",
        domainCode: "MA",
        mappedPractices: ["MA.L2-3.7.3"]
      },
      {
        id: "MA-3",
        text: "Do you check media containing diagnostic programs for malicious code before use on systems?",
        domainCode: "MA",
        mappedPractices: ["MA.L2-3.7.4"]
      }
    ]
  },
  {
    code: "MP",
    name: "Media protection",
    practiceCount: 9,
    questions: [
      {
        id: "MP-1",
        text: "Do you protect, store, transport, and sanitize media containing CUI?",
        domainCode: "MP",
        mappedPractices: ["MP.L2-3.8.1", "MP.L2-3.8.3"]
      },
      {
        id: "MP-2",
        text: "Do you mark media with required CUI markings and distribution limitations?",
        domainCode: "MP",
        mappedPractices: ["MP.L2-3.8.4"]
      },
      {
        id: "MP-3",
        text: "Do you control access to media containing CUI and encrypt it during transport?",
        domainCode: "MP",
        mappedPractices: ["MP.L2-3.8.5", "MP.L2-3.8.6"]
      }
    ]
  },
  {
    code: "PE",
    name: "Physical protection",
    practiceCount: 6,
    questions: [
      {
        id: "PE-1",
        text: "Do you limit physical access to systems, equipment, and operating environments to authorized individuals?",
        domainCode: "PE",
        mappedPractices: ["PE.L2-3.10.1", "PE.L2-3.10.2"]
      },
      {
        id: "PE-2",
        text: "Do you maintain audit logs of physical access?",
        domainCode: "PE",
        mappedPractices: ["PE.L2-3.10.4"]
      },
      {
        id: "PE-3",
        text: "Do you escort visitors and monitor visitor activity?",
        domainCode: "PE",
        mappedPractices: ["PE.L2-3.10.3", "PE.L2-3.10.5"]
      }
    ]
  },
  {
    code: "PS",
    name: "Personnel security",
    practiceCount: 2,
    questions: [
      {
        id: "PS-1",
        text: "Do you screen individuals prior to authorizing access to systems containing CUI?",
        domainCode: "PS",
        mappedPractices: ["PS.L2-3.9.1"]
      },
      {
        id: "PS-2",
        text: "Do you protect CUI during and after personnel actions such as termination or transfer?",
        domainCode: "PS",
        mappedPractices: ["PS.L2-3.9.2"]
      }
    ]
  },
  {
    code: "RA",
    name: "Risk assessment",
    practiceCount: 3,
    questions: [
      {
        id: "RA-1",
        text: "Do you periodically assess risk to operations, assets, and individuals from system operation?",
        domainCode: "RA",
        mappedPractices: ["RA.L2-3.11.1"]
      },
      {
        id: "RA-2",
        text: "Do you scan for vulnerabilities in systems and applications periodically and when new vulnerabilities are identified?",
        domainCode: "RA",
        mappedPractices: ["RA.L2-3.11.2", "RA.L2-3.11.3"]
      }
    ]
  },
  {
    code: "CA",
    name: "Security assessment",
    practiceCount: 4,
    questions: [
      {
        id: "CA-1",
        text: "Do you periodically assess your security controls to determine if they are effective?",
        domainCode: "CA",
        mappedPractices: ["CA.L2-3.12.1"]
      },
      {
        id: "CA-2",
        text: "Do you develop and implement action plans to correct deficiencies and reduce vulnerabilities?",
        domainCode: "CA",
        mappedPractices: ["CA.L2-3.12.2", "CA.L2-3.12.4"]
      }
    ]
  },
  {
    code: "SC",
    name: "System and communications protection",
    practiceCount: 16,
    questions: [
      {
        id: "SC-1",
        text: "Do you monitor, control, and protect communications at your network boundary?",
        domainCode: "SC",
        mappedPractices: ["SC.L2-3.13.1", "SC.L2-3.13.5"]
      },
      {
        id: "SC-2",
        text: "Do you implement architectural designs and development techniques that promote effective information security?",
        domainCode: "SC",
        mappedPractices: ["SC.L2-3.13.2"]
      },
      {
        id: "SC-3",
        text: "Do you encrypt CUI at rest and in transit?",
        domainCode: "SC",
        mappedPractices: ["SC.L2-3.13.8", "SC.L2-3.13.11"]
      },
      {
        id: "SC-4",
        text: "Do you deny network traffic by default and allow by exception (allowlisting)?",
        domainCode: "SC",
        mappedPractices: ["SC.L2-3.13.6"]
      }
    ]
  },
  {
    code: "SI",
    name: "System and information integrity",
    practiceCount: 7,
    questions: [
      {
        id: "SI-1",
        text: "Do you identify, report, and correct system flaws in a timely manner?",
        domainCode: "SI",
        mappedPractices: ["SI.L2-3.14.1"]
      },
      {
        id: "SI-2",
        text: "Do you protect against malicious code at designated locations such as endpoints and network gateways?",
        domainCode: "SI",
        mappedPractices: ["SI.L2-3.14.2", "SI.L2-3.14.4"]
      },
      {
        id: "SI-3",
        text: "Do you monitor system security alerts and advisories and take corrective action?",
        domainCode: "SI",
        mappedPractices: ["SI.L2-3.14.3", "SI.L2-3.14.6"]
      }
    ]
  }
];

export const totalQuestions = domains.reduce((sum, d) => sum + d.questions.length, 0);
export const totalPractices = domains.reduce((sum, d) => sum + d.practiceCount, 0);
