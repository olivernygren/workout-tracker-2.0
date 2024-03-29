import { createTheme } from '@material-ui/core';

const FONT_PRIMARY = 'Outfit';

interface Gradient {
	gradient: string;
}
declare module '@material-ui/core/styles/createPalette' {
	interface Palette {
		gradient: Gradient;
	}
	interface PaletteOptions {
		gradient?: Gradient;
	}
}

export const theme = createTheme({
	typography: {
		fontFamily: [FONT_PRIMARY, 'sans-serif'].join(','),
		fontWeightRegular: 400,
		h1: {
			fontWeight: 600,
			fontSize: 40,
			color: '#fff',
			zIndex: 1,
		},
		h2: {
			fontWeight: 600,
			fontSize: 34,
			color: '#fff',
			zIndex: 1,
		},
		h3: {
			fontWeight: 600,
			fontSize: 28,
			color: '#fff',
			zIndex: 1,
		},
		h4: {
			fontWeight: 600,
			fontSize: 22,
			color: '#fff',
			zIndex: 1,
		},
		h5: {
			fontWeight: 600,
			fontSize: 20,
			color: '#fff',
			zIndex: 1,
		},
		h6: {
			fontWeight: 500,
			fontSize: 18,
			color: '#fff',
			zIndex: 1,
		},
		subtitle1: {
			fontWeight: 500,
			fontSize: 16,
			color: '#fff',
			zIndex: 1,
		},
		subtitle2: {
			fontWeight: 500,
			fontSize: 14,
			color: '#fff',
			zIndex: 1,
		},
		body1: {
			fontWeight: 400,
			fontSize: 16,
			color: '#fff',
			zIndex: 1,
		},
		body2: {
			fontWeight: 400,
			fontSize: 14,
			color: '#fff',
			zIndex: 1,
		},
		button: {
			color: '#fff',
		},
	},
	palette: {
		primary: {
			light: '#9BD7A4',
			main: '#43AC54',
			dark: '#209533',
		},
		secondary: {
			light: '#474747',
			main: '#373737',
			dark: '#202020',
		},
		common: {
			white: '#fff',
			black: '#000',
		},
		gradient: {
			gradient:
				'linear-gradient(135deg, rgba(55,55,55,1) 0%, rgba(43,43,43,1) 100%)',
		},
	},
});

export default theme;
