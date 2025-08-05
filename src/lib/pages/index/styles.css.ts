import { vars } from '../../styles/theme_contract.css';
import { style } from '@vanilla-extract/css';

const container = style({
	maxWidth: '1024px',
	margin: 'auto',
});
const heading = style({
  display: 'flex',
  justifyContent: 'space-between',
});
const loadingText = style({
  fontSize: vars.size.text.sm,
  color: vars.color.text.dimmed,
});

export const styles = { container, heading, loadingText };
