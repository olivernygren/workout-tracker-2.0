import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	container: {
		display: 'flex',
		padding: '10px 12px',
		borderRadius: 12,
		backgroundImage: theme.palette.gradient.gradient,
		margin: '10px 0 20px 0',
		flexWrap: 'nowrap',
		alignItems: 'center',
	},
	headingContainer: {
		alignItems: 'center',
	},
	datesContainer: {
		alignItems: 'center',
		marginTop: 4,
	},
	datesIcon: {
		width: 18,
		height: 18,
	},
	dates: {
		color: theme.palette.grey[400],
		marginLeft: 10,
		marginTop: 2,
	},
	chip: {
		height: 22,
		backgroundColor: theme.palette.secondary.light,
		marginLeft: 12,
		'& > span': {
			fontWeight: 400,
			color: theme.palette.common.white,
			padding: 9,
		},
	},
	weightNumberContainer: {
		width: 'fit-content',
		flexWrap: 'nowrap',
		alignItems: 'end',
	},
	weight: {
		color: theme.palette.primary.light,
		marginRight: 5,
	},
	weightUnit: {
		color: theme.palette.primary.light,
	},
}));
