import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	container: {
		marginBottom: 14,
	},
	date: {
		// marginBottom: 8,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
	},
	progressCheckboxContainer: {
		width: 'fit-content',
		alignItems: 'center',
		'& > p': {
			color: theme.palette.grey[400],
		},
	},
	progressCheckbox: {
		color: theme.palette.grey[500],
	},
	notes: {
		marginBottom: 6,
		color: theme.palette.error.light,
	},
	set: {
		backgroundImage: theme.palette.gradient.gradient,
		borderRadius: 8,
		marginBottom: 8,
		padding: '7px 10px',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
	},
	weightXreps: {
		width: 'fit-content',
	},
	xSign: {
		margin: '0 10px',
	},
}));
