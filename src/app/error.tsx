'use client'; // Error components must be Client Components

import { cookiesName, routesPath } from '@/common';
import { deleteCookie } from 'cookies-next';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
    if (error.message == 'Unauthorized') {
      deleteCookie(cookiesName.IS_AUTH);
      redirect(routesPath.LOGIN);
    }
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!2</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
