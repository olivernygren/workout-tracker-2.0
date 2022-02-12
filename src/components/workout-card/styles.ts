import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	container: {
		backgroundImage: theme.palette.gradient.gradient,
		borderRadius: 12,
		padding: '14px 12px',
		marginBottom: 14,
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
	},
	iconContainer: {
		padding: 4,
		borderRadius: 30,
		backgroundColor: theme.palette.grey[700],
		height: 22,
		width: 22,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 12,
	},
	icon: {
		color: theme.palette.common.white,
	},
	left: {
		alignItems: 'center',
		width: 'fit-content',
	},
	sets: {
		width: 'fit-content',
		marginRight: 2,
	},
}));
