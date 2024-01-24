import { AppLayout, ThemeRegistry } from '@/components';

export const metadata = {
  title: 'PPL-timer',
  description: 'Сервіс для обліку та відстеженню робочого часу',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <ThemeRegistry>
        <body>
          <AppLayout>{children}</AppLayout>
        </body>
      </ThemeRegistry>
    </html>
  );
}
