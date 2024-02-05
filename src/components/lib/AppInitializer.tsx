'use client';

import { getUserAction } from '@/services';
import { userStore } from '@/store';
import { UserData } from '@/types';
import { useAction } from 'next-safe-action/hooks';
import { useEffect } from 'react';

type AppInitProps = {
  user?: UserData;
};

export const AppInitializer: React.FC<AppInitProps & React.PropsWithChildren> = ({
  user,
  children,
}) => {
  const { execute, status } = useAction(getUserAction, {
    onSuccess(data) {
      userStore.setState({
        data: data.success,
        loading: false,
      });
    },
    onExecute(data) {
      userStore.setState({
        loading: true,
      });
    },
  });

  useEffect(() => {
    execute({});
  }, []);

  return children;
};
