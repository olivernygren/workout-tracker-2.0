import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	container: {
		borderRadius: 12,
		backgroundImage: theme.palette.gradient.gradient,
		padding: 16,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		marginBottom: 16,
	},
}));
