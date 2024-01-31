import { AuthorizationLayout } from '@/components/layout';

export const metadata = {
  title: 'Авторизація',
  description: 'Сервіс для обліку та відстеженню робочого часу',
  authors: 'Novak Oleksander',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthorizationLayout>{children}</AuthorizationLayout>;
}
