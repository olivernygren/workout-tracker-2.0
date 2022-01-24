import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	container: {
		backgroundImage: theme.palette.gradient.gradient,
		borderRadius: 12,
		marginBottom: 16,
		padding: '8px 13px',
		display: 'flex',
		alignItems: 'center',
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
	setsXrepsContainer: {
		alignItems: 'center',
	},
	setsXreps: {
		color: theme.palette.grey[400],
	},
	icon: {
		color: theme.palette.primary.light,
		marginLeft: -3,
		marginRight: 6,
	},
}));
