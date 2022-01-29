import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	container: {
		marginBottom: 14,
	},
	date: {
		marginBottom: 8,
	},
	set: {
		backgroundImage: theme.palette.gradient.gradient,
		borderRadius: 8,
		marginBottom: 8,
		padding: '7px 10px',
	},
}));
