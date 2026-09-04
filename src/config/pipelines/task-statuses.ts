import type { TaskStatus } from "./types";

export const taskStatuses: TaskStatus[] = [
  {
    id: "todo",
    label: "To Do",
    order: 0,
    color: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",
  },
  {
    id: "in-progress",
    label: "In Progress",
    order: 1,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  },
  {
    id: "done",
    label: "Done",
    order: 2,
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  },
];
