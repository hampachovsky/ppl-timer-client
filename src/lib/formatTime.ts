import { format } from 'date-fns';

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsRemaining = Math.floor((seconds % 3600) % 60);

  return format(new Date(0, 0, 0, hours, minutes, secondsRemaining), 'HH:mm:ss');
};
