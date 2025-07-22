'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#ff9100' },
  },
  // لو تستخدم خط Google Fonts مع Next/font
  typography: { fontFamily: 'var(--font-roboto)' },
  // فعّل متغيرات CSS لمنع فليكر SSR
  cssVariables: true,
});

export default theme;
