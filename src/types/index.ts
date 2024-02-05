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
