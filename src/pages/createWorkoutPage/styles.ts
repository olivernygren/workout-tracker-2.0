import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	headerButton: {
		paddingTop: 5,
		paddingBottom: 5,
		borderRadius: 30,
		fontSize: 13,
		alignSelf: 'center',
	},
	contentContainer: {
		marginTop: 30,
	},
	input: {
		backgroundImage: theme.palette.gradient.gradient,
		padding: '14px 10px',
		borderRadius: 10,
		border: 'none',
		outline: 'none',
		color: theme.palette.common.white,
		fontFamily: 'Outfit',
		fontSize: 15,
		marginBottom: 16,
	},
	label: {
		marginBottom: 2,
		marginLeft: 2,
	},
	select: {
		borderRadius: 10,
		padding: '9px 10px',
		backgroundImage: theme.palette.gradient.gradient,
		color: theme.palette.common.white,
		'&.MuiInput-underline:after': {
			borderBottom: 'none',
		},
		'&.MuiInput-underline:before': {
			borderBottom: 'none',
		},
		'& > svg': {
			color: theme.palette.common.white,
			marginRight: 5,
		},
	},
	menuItem: {
		color: theme.palette.common.white,
		paddingTop: 0,
		paddingBottom: 0,
		minHeight: 38,
		'&:first-of-type': {
			paddingTop: 8,
			paddingBottom: 4,
		},
		'&:last-of-type': {
			paddingTop: 4,
			paddingBottom: 8,
		},
	},
	exercisesHeader: {
		alignItems: 'center',
		justifyContent: 'space-between',
		margin: '30px 0 12px 0',
	},
}));
