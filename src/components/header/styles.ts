import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	container: {
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		zIndex: 150,
		height: 60,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'start',
		padding: '0 16px',
	},
}));
