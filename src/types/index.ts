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
};

export type TimerIntervalData = {
  id: string;
  intervalStart: Date;
  intervalEnd: Date;
  intervalDuration: number;
  updatedAt: Date;
};
