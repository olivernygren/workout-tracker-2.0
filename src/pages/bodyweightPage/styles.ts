import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	headerButton: {
		paddingTop: 5,
		paddingBottom: 5,
		borderRadius: 30,
		fontSize: 13,
		alignSelf: 'center',
	},
	container: {
		marginTop: 30,
	},
	listItem: {
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: theme.palette.secondary.main,
		borderRadius: 8,
		padding: '8px 14px',
		marginBottom: 10,
	},
	weightContainer: {
		width: 'fit-content',
		alignItems: 'center',
	},
	weight: {
		marginRight: 10,
	},
	icon: {
		height: 22,
		width: 22,
	},
}));
