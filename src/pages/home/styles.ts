import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	headerButton: {
		textTransform: 'capitalize',
		fontSize: 17,
	},
	workoutCardContainer: {
		overflowX: 'scroll',
		paddingBottom: 30,
		flexWrap: 'nowrap',
		marginTop: 20,
	},
	cardContainer: {
		marginTop: 24,
	},
	spinnerContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	spinner: {
		margin: '0 auto',
	},
}));
