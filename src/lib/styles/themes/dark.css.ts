import { createTheme } from '@vanilla-extract/css';
import { vars } from '../theme_contract.css';

export const darkTheme = createTheme(vars, {
	color: {
		surface: {
			l1: '#000',
		},
		heading: '#fff',
		text: {
			base: '#f2f2f2',
			dimmed: '#8e8e8e',
		},
	},
});
