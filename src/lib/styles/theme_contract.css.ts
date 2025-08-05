import { createThemeContract } from '@vanilla-extract/css';

export const vars = createThemeContract({
	color: {
		surface: {
			l1: '',
		},
		heading: '',
		text: {
			base: '',
			dimmed: '',
		},
	},
  size: {
    text: {
      xs: '',
      sm: '',
      base: '',
      lg: '',
      xl: '',
    },
  },
});
