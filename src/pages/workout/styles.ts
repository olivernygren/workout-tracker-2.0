import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	headerButton: {
		paddingTop: 5,
		paddingBottom: 5,
		borderRadius: 30,
		fontSize: 13,
		alignSelf: 'center',
	},
	cardContainer: {
		marginTop: 30,
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
