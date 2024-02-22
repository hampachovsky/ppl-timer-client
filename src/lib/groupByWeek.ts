import { TimerData } from '@/types';
import { format } from 'date-fns';
import { groupBy } from 'lodash';

export const formatDate = (date: TimerData): string => {
  return format(date.updatedAt, 'yyyy.MM.dd');
};

export const groupByWeek = (data: TimerData[]): { [key: string]: TimerData[] } => {
  return groupBy(data, formatDate);
};
