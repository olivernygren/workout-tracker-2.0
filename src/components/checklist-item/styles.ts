import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'nowrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '14px 10px 18px 14px',
		borderRadius: 10,
		backgroundImage: theme.palette.gradient.gradient,
		marginBottom: 18,
		position: 'relative',
	},
	chip: {
		width: 'fit-content',
		height: 24,
		marginTop: 8,
		backgroundColor: theme.palette.secondary.light,
		// color: theme.palette.common.white
	},
	textContainer: {
		width: 'fit-content',
	},
	checkboxContainer: {
		alignItems: 'center',
		width: 'fit-content',
		color: theme.palette.common.white,
		marginTop: 3,
	},
	label: {
		marginRight: 10,
	},
	deleteButton: {
		// background: '#FF4B4B',
		// color: '#FF4B4B',
		padding: 5,
		position: 'absolute',
		top: -10,
		right: -10,
		backgroundColor: theme.palette.secondary.light,
		color: theme.palette.common.white,
	},
	checkbox: {
		color: theme.palette.grey[300],
	},
}));
