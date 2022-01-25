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
}));
