import { Box, Button, Typography } from '@material-ui/core';
import { ChevronRightRounded } from '@material-ui/icons';
import React from 'react';

import useStyles from './styles';

interface IHomeWorkoutCard {
	name: string;
	exercises: number;
	sets: number;
}

export const HomeWorkoutCard = ({
	name,
	exercises,
	sets,
}: IHomeWorkoutCard) => {
	const classes = useStyles();
	const exercisesString = `${exercises} övningar`;
	const setsString = `${sets} set`;

	return (
		<Box className={classes.container}>
			<Typography variant="h6" className={classes.workoutName}>
				{name}
			</Typography>
			<Typography variant="body2">{exercisesString}</Typography>
			<Typography variant="body2">{setsString}</Typography>
			<Button
				variant="contained"
				color="primary"
				className={classes.button}
				endIcon={<ChevronRightRounded />}
			>
				Se pass
			</Button>
		</Box>
	);
};

export default HomeWorkoutCard;
