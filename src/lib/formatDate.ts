import { TimerData } from '@/types';
import { format } from 'date-fns';

export const formatDate = (date: TimerData): string => {
  return format(date.updatedAt, 'yyyy.MM');
};
