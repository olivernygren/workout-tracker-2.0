import { Box, Grid, Typography } from '@material-ui/core';
import { FitnessCenterRounded } from '@material-ui/icons';
import React from 'react';

import useStyles from './styles';

interface IWorkoutCard {
	name: string;
	sets: number;
	path: string;
}

export const WorkoutCard = () => {
	const classes = useStyles();
	return (
		<Box className={classes.container}>
			<Grid item container className={classes.left}>
				<Box className={classes.iconContainer}>
					<FitnessCenterRounded fontSize="small" className={classes.icon} />
				</Box>
				<Typography variant="subtitle1">Chest &amp; Biceps</Typography>
			</Grid>
			<Grid item className={classes.sets}>
				<Typography variant="body2">20 set</Typography>
			</Grid>
		</Box>
	);
};

export default WorkoutCard;
