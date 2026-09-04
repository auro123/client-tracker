export type Stage = {
  id: string;
  label: string;
  order: number;
  color: string;
};

export type TaskStatus = {
  id: string;
  label: string;
  order: number;
  color: string;
};

export type Pipeline = {
  id: string;
  label: string;
  stages: Stage[];
};
