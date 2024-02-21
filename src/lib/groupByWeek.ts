import { formatDate } from '@/lib';
import { TimerData } from '@/types';
import { groupBy } from 'lodash';

export const groupByWeek = (data: TimerData[]): { [key: string]: TimerData[] } => {
  return groupBy(data, formatDate);
};
