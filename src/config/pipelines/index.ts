import { clientOnboardingPipeline } from "./client-onboarding";
import { taskStatuses } from "./task-statuses";
import type { Pipeline, Stage, TaskStatus } from "./types";

export type { Pipeline, Stage, TaskStatus };

export const pipelines: Pipeline[] = [clientOnboardingPipeline];

export function getPipeline(pipelineId: string): Pipeline | undefined {
  return pipelines.find((pipeline) => pipeline.id === pipelineId);
}

export function getStage(pipelineId: string, stageId: string): Stage | undefined {
  return getPipeline(pipelineId)?.stages.find((stage) => stage.id === stageId);
}

export function listStages(pipelineId: string): Stage[] {
  const pipeline = getPipeline(pipelineId);
  if (!pipeline) return [];
  return [...pipeline.stages].sort((a, b) => a.order - b.order);
}

export function getTaskStatus(statusId: string): TaskStatus | undefined {
  return taskStatuses.find((status) => status.id === statusId);
}

export function listTaskStatuses(): TaskStatus[] {
  return [...taskStatuses].sort((a, b) => a.order - b.order);
}
