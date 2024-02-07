'use client';
import { Roboto } from 'next/font/google';

import { orange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface Palette {
    customBG: {
      list: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
  interface PaletteOptions {
    customBG?: {
      list?: string;
    };
  }
}

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
});

// TODO: CHANGE COLOR SCHEME

const colors = {
  grey: '#1A202C',
  darkGrey: '#1b1e26',
  lightGrey: '#20242d',
  lightGreen: '#81E6D9',
  darkGreen: '#319795',
  white: '#FFFFFF',
  darkWhite: '#edf2f7',
  red: '#e52e3a',
};

export const baseTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  shape: {
    borderRadius: 0,
  },
});

// TODO: Update light theme
export const lightTheme = createTheme({
  ...baseTheme,
  status: {
    danger: orange[500],
  },
  palette: {
    mode: 'light',
    background: {
      default: colors.darkWhite,
      paper: colors.darkWhite,
    },
    primary: {
      main: colors.darkGreen,
    },
    customBG: {
      list: colors.lightGrey,
    },
    secondary: { main: colors.darkWhite },
    error: {
      main: colors.red,
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  status: {
    danger: orange[500],
  },

  palette: {
    mode: 'dark',
    background: {
      default: colors.grey,
      paper: colors.darkGrey,
    },
    customBG: {
      list: colors.lightGrey,
    },
    primary: {
      main: colors.darkGreen,
    },
    error: {
      main: colors.red,
    },
    secondary: { main: colors.lightGrey },
  },
});
