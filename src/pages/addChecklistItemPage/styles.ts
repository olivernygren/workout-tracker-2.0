import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	headerButton: {
		paddingTop: 5,
		paddingBottom: 5,
		borderRadius: 30,
		fontSize: 13,
		alignSelf: 'center',
	},
	titleContainer: {
		marginTop: 30,
	},
	selectContainer: {
		marginTop: 20,
	},
	label: {
		marginBottom: 6,
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
			opacity: 0,
		},
		'& > svg': {
			color: theme.palette.common.white,
			marginRight: 5,
		},
	},
	selectMenu: {
		backgroundColor: '#474747',
		padding: 0,
		borderRadius: 10,
		maxHeight: 200,
		width: '100%',
		marginTop: 60,
	},
	menuItem: {
		color: theme.palette.common.white,
		paddingTop: 0,
		paddingBottom: 0,
		minHeight: 34,
		'&:first-of-type': {
			paddingTop: 8,
			paddingBottom: 4,
		},
		'&:last-of-type': {
			paddingTop: 4,
			paddingBottom: 8,
		},
	},
	addButton: {
		position: 'fixed',
		bottom: 20,
		right: 16,
		left: 16,
		width: 'calc(100vw - 32px)',
		borderRadius: 40,
		zIndex: 20,
		paddingTop: 7,
		paddingBottom: 7,
	},
}));
