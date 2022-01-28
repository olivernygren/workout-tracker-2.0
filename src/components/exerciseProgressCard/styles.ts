import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	container: {
		backgroundImage: theme.palette.gradient.gradient,
		borderRadius: 12,
		marginBottom: 10,
		padding: '6px 7px 6px 11px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	progressButton: {
		backgroundColor: theme.palette.grey[800],
		height: 'fit-content',
		borderRadius: 10,
		'&:hover': {
			borderRadius: 10,
			backgroundColor: theme.palette.grey[900],
		},
	},
}));
