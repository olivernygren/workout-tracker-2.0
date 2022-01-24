import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	headerButton: {
		textTransform: 'capitalize',
		fontSize: 17,
	},
	workoutCardContainer: {
		overflowX: 'scroll',
		// overflowY: 'visible',
		paddingBottom: 30,
		flexWrap: 'nowrap',
		marginTop: 20,
	},
	cardContainer: {
		marginTop: 30,
	},
}));
