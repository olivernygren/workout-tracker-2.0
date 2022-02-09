import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	headerButtons: {
		width: 'fit-content',
		alignItems: 'center',
		marginTop: 3,
	},
	listItemContainer: {
		marginTop: 30,
	},
	resetButton: {
		padding: 6,
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.common.white,
		marginRight: 10,
		height: 'fit-content',
	},
	addButton: {
		padding: 6,
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
		height: 'fit-content',
	},
	spinnerContainer: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	spinner: {
		margin: '0 auto',
	},
}));
