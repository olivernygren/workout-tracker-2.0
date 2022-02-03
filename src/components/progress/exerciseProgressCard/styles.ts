import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	container: {
		backgroundImage: theme.palette.gradient.gradient,
		borderRadius: 10,
		marginBottom: 10,
		padding: '3px 7px 3px 11px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		minHeight: 44,
	},
	progressButton: {
		backgroundColor: 'transparent',
		// backgroundColor: theme.palette.grey[800],
		height: 'fit-content',
		borderRadius: 8,
		'&:hover': {
			borderRadius: 8,
			backgroundColor: theme.palette.grey[900],
		},
	},
}));
