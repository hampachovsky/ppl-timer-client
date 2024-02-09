// FIXME: remove devtols middleware

// @ts-nocheck

import { UserData } from '@/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type State = {
  data: UserData | null;
  loading: boolean;
  isAuth: boolean;
  qs: sting;
};

type Actions = {
  setUser: (data: UserData) => void;
  unSetUser: () => void;
};

export const userStore = create<State & Actions>(
  devtools(
    persist(
      (set) => ({
        loading: false,
        data: null,
        setUser: (data: UserData) => set({ data }, 'user/setUser'),
        setQS: (qs: string) => set({ qs }, 'user/setQS'),
        unSetUser: () => set((state) => ({ data: null }, 'user/unSetUser')),
      }),
      { name: 'userState' }
    )
  )
);
