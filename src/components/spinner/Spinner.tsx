import { CircularProgress, Grid } from '@material-ui/core';

import useStyles from './styles';

export const Spinner = () => {
	const classes = useStyles();
	return (
		<Grid item container className={classes.spinnerContainer}>
			<CircularProgress />
		</Grid>
	);
};

export default Spinner;
