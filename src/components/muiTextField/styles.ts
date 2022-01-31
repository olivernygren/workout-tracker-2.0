import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	muiInput: {
		backgroundImage: theme.palette.gradient.gradient,
		padding: '8px 8px 8px 0',
		borderRadius: 10,
		border: 'none',
		outline: 'none',
		color: theme.palette.common.white,
		fontSize: 15,
		alignItems: 'center',
		'&.MuiFilledInput-underline:after': {
			borderBottom: 'none',
		},
		'&.MuiFilledInput-underline:before': {
			borderBottom: 'none',
		},
	},
	inputIcon: {
		'&.MuiInputAdornment-filled.MuiInputAdornment-positionStart:not(.MuiInputAdornment-hiddenLabel)':
			{
				marginTop: 0,
				marginLeft: 10,
			},
	},
	smallInput: {
		height: 30,
		width: 70,
		backgroundImage: theme.palette.gradient.gradient,
		padding: '2px 4px',
		borderRadius: 5,
		border: 'none',
		outline: 'none',
		color: theme.palette.common.white,
		fontSize: 14,
		alignItems: 'center',
		textAlign: 'center',
	},
	tinyInput: {
		height: 30,
		width: 40,
		backgroundImage: theme.palette.gradient.gradient,
		padding: '2px 4px',
		borderRadius: 4,
		border: 'none',
		outline: 'none',
		color: theme.palette.common.white,
		fontSize: 14,
		alignItems: 'center',
		textAlign: 'center',
	},
	divParent: {
		backgroundColor: 'transparent',
		height: 'fit-content',
		width: 'fit-content',
		paddingLeft: '0px',
		'&.MuiFilledInput-underline:after': {
			borderBottom: 'none',
		},
		'&.MuiFilledInput-underline:hover:before': {
			borderBottom: 'none',
		},
		'&.MuiFilledInput-underline:before': {
			borderBottom: 'none',
		},
		'&.MuiFilledInput-underline:hover:after': {
			borderBottom: 'none',
		},
	},
}));
