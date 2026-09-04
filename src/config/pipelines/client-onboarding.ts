import type { Pipeline } from "./types";

export const clientOnboardingPipeline: Pipeline = {
  id: "client-onboarding",
  label: "Client Onboarding",
  stages: [
    {
      id: "contacted",
      label: "Contacted",
      order: 0,
      color: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
    },
    {
      id: "proposal-sent",
      label: "Proposal Sent",
      order: 1,
      color: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    },
    {
      id: "onboarding",
      label: "Onboarding",
      order: 2,
      color: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300",
    },
    {
      id: "in-delivery",
      label: "In Delivery",
      order: 3,
      color: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300",
    },
    {
      id: "delivered",
      label: "Delivered",
      order: 4,
      color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    },
  ],
};
