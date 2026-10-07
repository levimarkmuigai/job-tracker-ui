import { useState } from "react";

export const APPLICATION_STATUSES = [
  "wishlist",
  "applied",
  "screening",
  "interviewing",
  "offer",
  "rejected",
  "withdrawn",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export type Application = {
  id: number;
  company: string;
  role: string;
  status: ApplicationStatus;
  dateApplied: Date | null;
  link: string | null;
  source: string | null;
  nextAction: string | null;
  nextActionDate: Date | null;
  notes: string | null;
  updatedAt: Date;
};

export type NewApplication = Omit<Application, "id" | "updatedAt">;

const daysFromNow = (days: number): Date => {
  const d = new Date();
  d.setHours(9, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d;
};

export const fakeApplications: Application[] = [
  {
    id: 1,
    company: "Stripe",
    role: "Senior Frontend Engineer",
    status: "interviewing",
    dateApplied: daysFromNow(-21),
    link: "https://stripe.com/jobs/example-1",
    source: "LinkedIn",
    nextAction: "Onsite loop (4 rounds)",
    nextActionDate: daysFromNow(3),
    notes: "Recruiter was friendly. Focus on system design and React performance.",
    updatedAt: daysFromNow(-2),
  },
  {
    id: 2,
    company: "Vercel",
    role: "Product Engineer",
    status: "screening",
    dateApplied: daysFromNow(-9),
    link: "https://vercel.com/careers/example-2",
    source: "Company website",
    nextAction: "Recruiter call",
    nextActionDate: daysFromNow(1),
    notes: null,
    updatedAt: daysFromNow(-1),
  },
  {
    id: 3,
    company: "Linear",
    role: "Full Stack Engineer",
    status: "applied",
    dateApplied: daysFromNow(-5),
    link: "https://linear.app/careers/example-3",
    source: "Referral",
    nextAction: "Follow up if no reply",
    nextActionDate: daysFromNow(5),
    notes: "Referred by Sam from my previous team.",
    updatedAt: daysFromNow(-5),
  },
  {
    id: 4,
    company: "Shopify",
    role: "Staff Software Engineer",
    status: "offer",
    dateApplied: daysFromNow(-40),
    link: "https://shopify.com/careers/example-4",
    source: "Recruiter outreach",
    nextAction: "Negotiate compensation",
    nextActionDate: daysFromNow(2),
    notes: "Verbal offer received. Ask about equity refresh and remote policy.",
    updatedAt: daysFromNow(-1),
  },
  {
    id: 5,
    company: "Notion",
    role: "Frontend Engineer",
    status: "rejected",
    dateApplied: daysFromNow(-30),
    link: "https://notion.so/careers/example-5",
    source: "LinkedIn",
    nextAction: null,
    nextActionDate: null,
    notes: "Rejected after technical screen. Revisit in 6 months.",
    updatedAt: daysFromNow(-12),
  },
  {
    id: 6,
    company: "Figma",
    role: "Software Engineer, Editor",
    status: "wishlist",
    dateApplied: null,
    link: "https://figma.com/careers/example-6",
    source: "Job board",
    nextAction: "Tailor resume and apply",
    nextActionDate: daysFromNow(4),
    notes: "Need to brush up on canvas / WebGL basics first.",
    updatedAt: daysFromNow(-3),
  },
  {
    id: 7,
    company: "Airbnb",
    role: "Senior Software Engineer",
    status: "withdrawn",
    dateApplied: daysFromNow(-25),
    link: null,
    source: "Referral",
    nextAction: null,
    nextActionDate: null,
    notes: "Withdrew after accepting a better-fit process elsewhere.",
    updatedAt: daysFromNow(-10),
  },
  {
    id: 8,
    company: "Datadog",
    role: "Frontend Engineer, Dashboards",
    status: "interviewing",
    dateApplied: daysFromNow(-14),
    link: "https://datadoghq.com/careers/example-8",
    source: "Company website",
    nextAction: "Take-home assignment due",
    nextActionDate: daysFromNow(2),
    notes: "Take-home: build a small charting component with TypeScript.",
    updatedAt: daysFromNow(-4),
  },
  {
    id: 9,
    company: "Canva",
    role: "Senior Frontend Engineer",
    status: "applied",
    dateApplied: daysFromNow(-2),
    link: "https://canva.com/careers/example-9",
    source: "LinkedIn",
    nextAction: null,
    nextActionDate: null,
    notes: null,
    updatedAt: daysFromNow(-2),
  },
  {
    id: 10,
    company: "Cloudflare",
    role: "Systems Engineer",
    status: "rejected",
    dateApplied: daysFromNow(-45),
    link: "https://cloudflare.com/careers/example-10",
    source: "Job board",
    nextAction: null,
    nextActionDate: null,
    notes: "Not enough Rust experience, per feedback.",
    updatedAt: daysFromNow(-20),
  },
];

export function useFakeData(initial: Application[] = fakeApplications) {
  const [applications, setApplications] = useState<Application[]>(initial);

  const addApplication = (data: NewApplication): Application => {
    const created: Application = {
      ...data,
      id: Math.max(0, ...applications.map((a) => a.id)) + 1,
      updatedAt: new Date(),
    };
    setApplications((prev) => [created, ...prev]);
    return created;
  };

  const updateApplication = (id: number, patch: Partial<NewApplication>) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...patch, updatedAt: new Date() } : a)),
    );
  };

  const deleteApplication = (id: number) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  return { applications, addApplication, updateApplication, deleteApplication };
}
