// FIXME: remove devtols middleware

// @ts-nocheck

import { UserData } from '@/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  data: UserData | null;
  isAuth: boolean;
  loading: boolean;
};

type Actions = {
  setUser: (data: UserData) => void;
  unSetUser: () => void;
};

export const userStore = create<State & Actions>(
  devtools(
    (set) => ({
      data: null,
      setUser: (data: UserData) => set({ data }, 'user/setUser'),
      unSetUser: () => set({ data: null }),
    }),
    { name: 'userState' }
  )
);
