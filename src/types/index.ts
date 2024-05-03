export type UserResponse = {
  user: UserData;
  token: string;
};

export type UserData = {
  id: string;
  email: string;
  username: string;
};

export type RequestError = {
  status: number | string;
  statusText: string;
};

export type TagData = {
  id: string;
  tagName: string;
  archived: boolean;
};

export type PageSearchParams = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type TimerData = {
  id: string;
  timerName: string;
  timerDescription: string;
  timerSummary: number;
  isRunning: boolean;
  createdAt: Date;
  updatedAt: Date;
  timerIntervals: TimerIntervalData[];
  tags: TagData[];
  assignedProject: ProjectData | null;
};

export type ProjectData = {
  id: string;
  projectName: string;
  projectDescription: string;
  note: string;
  archived: boolean;
  billable: boolean;
  color: string;
  hourlyRate: number;
  createdAt: Date;
  client: ClientData;
};

export type ClientData = {
  id: string;
  clientName: string;
  clientEmail: string;
  clientNote: string;
  archived: boolean;
};

export type TimerIntervalData = {
  id: string;
  intervalStart: Date;
  intervalEnd: Date;
  intervalDuration: number;
  updatedAt: Date;
};

export type StopTimerDto = {
  intervalId: string;
  intervalEnd: Date;
  intervalDuration: number;
};

export type ProjectFiltersToApplyDto = {
  projectType: string;
  clients: string[];
  billable: boolean | null;
  projectName: string;
};

export type CreateProjectDto = {
  projectName: string;
  color: string;
  clientId: string | null;
};

export type CreateClientDto = {
  clientName: string;
  clientEmail: string;
};

export type UpdateClientDto = Partial<ClientData>;
