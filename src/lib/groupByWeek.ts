import { TimerData } from '@/types';
import { format } from 'date-fns';
import { groupBy } from 'lodash';

export const formatDate = (data: TimerData): string => {
  return format(data.updatedAt, 'yyyy.MM.dd');
};

export const groupByWeek = (data: TimerData[]): { [key: string]: TimerData[] } => {
  return groupBy(data, formatDate);
};
