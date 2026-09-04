import Link from "next/link";
import { notFound } from "next/navigation";

import type { Task } from "@prisma/client";

import { getStage, getTaskStatus } from "@/config/pipelines";
import { formatDueDate } from "@/lib/date";
import { db } from "@/lib/db";

const fallbackBadge =
  "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300";

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[id]">) {
  const { id } = await params;

  const project = await db.project.findUnique({
    where: { id },
    include: {
      tasks: { orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] },
    },
  });

  if (!project) {
    notFound();
  }

  const stage = getStage(project.pipelineId, project.stageId);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← All projects
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {project.name}
          </h1>
          <p className="text-muted-foreground">{project.clientName}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {project.archivedAt && (
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${fallbackBadge}`}>
              Archived
            </span>
          )}
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${stage?.color ?? fallbackBadge}`}
          >
            {stage?.label ?? project.stageId}
          </span>
        </div>
      </div>

      {project.notes && (
        <p className="mt-4 whitespace-pre-wrap text-sm text-muted-foreground">
          {project.notes}
        </p>
      )}

      <h2 className="mt-8 text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Tasks
      </h2>

      {project.tasks.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">No tasks yet.</p>
      ) : (
        <ul className="mt-3 divide-y divide-border rounded-lg border border-border">
          {project.tasks.map((task: Task) => {
            const status = getTaskStatus(task.statusId);
            return (
              <li
                key={task.id}
                className="flex items-center justify-between gap-4 px-4 py-3"
              >
                <span className="text-sm">{task.title}</span>
                <div className="flex items-center gap-3">
                  {task.dueDate && (
                    <span className="text-xs text-muted-foreground">
                      {formatDueDate(task.dueDate)}
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${status?.color ?? fallbackBadge}`}
                  >
                    {status?.label ?? task.statusId}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
