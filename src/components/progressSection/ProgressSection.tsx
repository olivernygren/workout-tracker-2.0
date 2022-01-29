import { Box, Grid, Typography } from '@material-ui/core';
import { ProgressInstance } from '../../types';
import { formatDate } from '../../utils';

import useStyles from './styles';

interface IProgressSection {
	progressInstances: ProgressInstance[];
	date: string;
}

export const ProgressSection = ({
	progressInstances,
	date,
}: IProgressSection) => {
	const classes = useStyles();
	const dateString = formatDate(date);
	return (
		<Box className={classes.container}>
			<Typography variant="h6" className={classes.date}>
				{dateString}
			</Typography>
			<Grid item container direction="column">
				{progressInstances.map((instance) => (
					<Grid item container className={classes.set}>
						<Typography variant="body1">Set {instance.setIndex}</Typography>
						<Typography variant="body1">{instance.weight} kg</Typography>
						<Typography variant="body1">{instance.reps} reps</Typography>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default ProgressSection;
