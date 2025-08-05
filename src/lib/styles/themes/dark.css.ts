import { createTheme } from '@vanilla-extract/css';
import { vars } from '../theme_contract.css';

export const darkTheme = createTheme(vars, {
  color: {
    surface: {
      l1: '#212529',
    },
    heading: '#f8f9fa',
    text: {
      base: '#f1f3f5',
      dimmed: '#ced4da',
    },
  },
  size: {
    text: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
  },
});
