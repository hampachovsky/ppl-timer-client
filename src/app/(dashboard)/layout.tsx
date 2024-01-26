import { AppLayout } from '@/components';

export const metadata = {
  title: 'PPL-timer',
  description: 'Сервіс для обліку та відстеженню робочого часу',
  authors: 'Novak Oleksander',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
