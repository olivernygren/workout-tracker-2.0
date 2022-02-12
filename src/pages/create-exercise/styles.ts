import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	headerButton: {
		paddingTop: 5,
		paddingBottom: 5,
		borderRadius: 30,
		fontSize: 13,
		alignSelf: 'center',
	},
	select: {
		marginTop: 20,
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
	chipContainer: {
		margin: '8px 0 0 0',
	},
	chip: {
		paddingTop: 4,
		paddingBottom: 4,
		marginRight: 6,
		height: 25,
		backgroundColor: theme.palette.secondary.light,
		color: theme.palette.common.white,
		'& > svg': {
			color: theme.palette.grey[600],
			width: 18,
			height: 18,
			marginRight: 4,
		},
	},
}));
