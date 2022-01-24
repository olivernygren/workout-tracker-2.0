import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import { ReplayRounded } from '@material-ui/icons';
import React from 'react';
import { ProgressIcon } from '../../utils';

import useStyles from './styles';

interface IExerciseCard {
	exercise: string;
	sets: number;
	repRange: string;
}

export const ExerciseCard = ({ exercise, sets, repRange }: IExerciseCard) => {
	const classes = useStyles();
	const setsAndRepsString = `${sets} × ${repRange}`;

	return (
		<Box className={classes.container}>
			<Grid item container direction="column">
				<Typography variant="subtitle1">{exercise}</Typography>
				<Grid item container className={classes.setsXrepsContainer}>
					<ReplayRounded className={classes.icon} fontSize="small" />
					<Typography variant="body1" className={classes.setsXreps}>
						{setsAndRepsString}
					</Typography>
				</Grid>
			</Grid>
			<IconButton className={classes.progressButton}>
				<ProgressIcon />
			</IconButton>
		</Box>
	);
};

export default ExerciseCard;
