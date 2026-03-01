export const N8N_WEBHOOK_URL = "https://theagencyalternative.app.n8n.cloud/webhook-test/AWTS-taxes"

export interface ScorecardSection {
  id: string
  title: string
  subtitle: string
  questions: ScorecardQuestion[]
}

export interface ScorecardQuestion {
  id: string
  label: string
  type: "radio" | "dropdown"
  options: string[]
  required: boolean
}

export interface LeadInfo {
  fullName: string
  email: string
  phone: string
  businessName: string
  state: string
  consent: boolean
}

export interface ScorecardResult {
  status: string
  lead: {
    name: string
    email: string
    phone: string
    businessName: string
    state: string
  }
  scorecard: {
    taxEfficiencyScore: number
    riskScore: number
    leakageBand: "low" | "moderate" | "high"
    leakageLabel: string
    urgencyLevel: number
  }
  findings: {
    riskFlags: Array<{ trigger: string; points: number }>
    opportunities: string[]
    flagCount: number
  }
  pdf: {
    url: string
    fileName: string
    expiresAt: string
  }
  cta: {
    message: string
    bookingUrl: string
  }
  validations: {
    hasPdfUrl: boolean
    hasRiskFlags: boolean
    hasOpportunities: boolean
  }
}

export const AUSTRALIAN_STATES = [
  "New South Wales",
  "Victoria",
  "Queensland",
  "South Australia",
  "Western Australia",
  "Tasmania",
  "Northern Territory",
  "Australian Capital Territory",
]

export const SCORECARD_SECTIONS: ScorecardSection[] = [
  {
    id: "structure-income",
    title: "Structure & Income",
    subtitle: "Tell us about your business setup and revenue",
    questions: [
      {
        id: "businessStructure",
        label: "What is your business structure?",
        type: "radio",
        options: ["Sole trader", "Company", "Company + trust", "Not sure"],
        required: true,
      },
      {
        id: "annualRevenue",
        label: "What is your annual revenue?",
        type: "dropdown",
        options: ["Under $300k", "$300k\u2013$750k", "$750k\u2013$1.5M", "$1.5M+"],
        required: true,
      },
      {
        id: "netProfit",
        label: "Approximate net profit before tax?",
        type: "dropdown",
        options: ["Under $50k", "$50k\u2013$150k", "$150k\u2013$300k", "$300k+"],
        required: true,
      },
    ],
  },
  {
    id: "salary-drawings",
    title: "Salary & Drawings",
    subtitle: "How you pay yourself and involve family",
    questions: [
      {
        id: "payYourself",
        label: "How do you pay yourself?",
        type: "radio",
        options: [
          "Wage through payroll",
          "Director drawings",
          "Mix of both",
          "Just take money when needed",
        ],
        required: true,
      },
      {
        id: "spouseInvolved",
        label: "Is your spouse/partner involved in the business?",
        type: "radio",
        options: ["Yes \u2013 on payroll", "Yes \u2013 unpaid", "No"],
        required: true,
      },
    ],
  },
  {
    id: "deductions-assets",
    title: "Deductions & Assets",
    subtitle: "Vehicles, trusts, equipment and tax awareness",
    questions: [
      {
        id: "vehicleSetup",
        label: "What is your vehicle setup?",
        type: "radio",
        options: [
          "Personal vehicle",
          "Business vehicle owned by company",
          "Financed through business",
          "Not sure",
        ],
        required: true,
      },
      {
        id: "trustForDistribution",
        label: "Do you use a trust for income distribution?",
        type: "radio",
        options: ["Yes", "No", "Not sure"],
        required: true,
      },
      {
        id: "planningEquipment",
        label: "Planning to buy equipment in the next 12 months?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
      },
      {
        id: "knowEffectiveTaxRate",
        label: "Do you know your effective tax rate?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
      },
    ],
  },
  {
    id: "operations-tax",
    title: "Operations & Tax Behaviour",
    subtitle: "Operational habits and tax planning practices",
    questions: [
      {
        id: "multipleStates",
        label: "Do you operate across multiple states?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
      },
      {
        id: "paymentModel",
        label: "What is your payment model?",
        type: "radio",
        options: ["Fixed price only", "Progress claims", "Mix"],
        required: true,
      },
      {
        id: "prePlanPurchases",
        label: "Do you pre-plan purchases before June 30?",
        type: "radio",
        options: ["Yes \u2013 with accountant", "Sometimes", "No"],
        required: true,
      },
      {
        id: "setAsideGST",
        label: "Do you set aside GST weekly?",
        type: "radio",
        options: ["Yes \u2013 automated", "Yes \u2013 manually", "No"],
        required: true,
      },
      {
        id: "reviewedStructure",
        label: "Have you reviewed your structure in the last 2 years?",
        type: "radio",
        options: ["Yes", "No", "Never"],
        required: true,
      },
    ],
  },
  {
    id: "assets-compliance",
    title: "Assets & Compliance",
    subtitle: "Property, profit usage and ATO history",
    questions: [
      {
        id: "propertyOwnership",
        label: "How is your investment property owned?",
        type: "radio",
        options: ["Personally", "Trust", "Company", "Not sure"],
        required: true,
      },
      {
        id: "profitUsage",
        label: "What do you do with your profits?",
        type: "radio",
        options: ["Reinvest", "Withdraw majority", "Mix"],
        required: true,
      },
      {
        id: "atoAudited",
        label: "Have you been audited or received ATO penalties?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
      },
    ],
  },
]
