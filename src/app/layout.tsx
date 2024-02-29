import { cookiesName, darkTheme, lightTheme } from '@/common';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'PPL-timer',
  description: 'Сервіс для обліку та відстеженню робочого часу',
  authors: 'Novak Oleksander',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = getCookie(cookiesName.THEME, { cookies });
  return (
    <html lang='en'>
      <head>
        <link rel='shortcut icon' href='#' />
      </head>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme == 'dark' ? darkTheme : lightTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
