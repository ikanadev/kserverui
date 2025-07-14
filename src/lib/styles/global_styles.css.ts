import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme_contract.css';

globalStyle('html, body', {
	lineHeight: '1.5',
	WebkitFontSmoothing: 'antialiased',
	background: vars.color.surface.l1,
	color: vars.color.text.base,
	fontFamily:
		'ui-sans-serif, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
	fontWeight: 400,
});

globalStyle('*, *:before, *:after', {
	boxSizing: 'border-box',
});

globalStyle('*', {
	margin: 0,
});

// Improve media defaults
globalStyle('img, picture, video, canvas, svg', {
	display: 'block',
	maxWidth: '100%',
	height: 'auto',
});

// Inherit fonts for inputs and buttons
globalStyle('input, button, textarea, select', {
	font: 'inherit',
});

// Avoid text overflow
globalStyle('p, h1, h2, h3, h4, h5, h6', {
	overflowWrap: 'break-word',
});

// Improve line wrapping
globalStyle('p', {
	textWrap: 'pretty',
});
globalStyle('h1, h2, h3, h4, h5, h6', {
	textWrap: 'balance',
});
