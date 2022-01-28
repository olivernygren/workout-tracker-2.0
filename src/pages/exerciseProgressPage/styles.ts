import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	headerButton: {
		padding: 5,
		borderRadius: 30,
		fontSize: 13,
		alignSelf: 'center',
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
	},
}));
