import { MyAuthLayout } from '@/components/layout/MyAuthLayout';

export const metadata = {
  title: 'PPL-timer',
  description: 'Сервіс для обліку та відстеженню робочого часу',
  authors: 'Novak Oleksander',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <MyAuthLayout>{children}</MyAuthLayout>;
}
