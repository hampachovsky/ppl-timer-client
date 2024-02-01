export type UserResponse = {
  user: UserData;
  token: string;
};

export type UserData = {
  id: string;
  email: string;
  username: string;
};
