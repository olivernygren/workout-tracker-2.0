import { useNavigate } from 'react-router-dom';
import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import { ReplayRounded } from '@material-ui/icons';

import { ExerciseInstance } from '../../types';
import { exerciseNameToPathConverter, ProgressIcon } from '../../utils';

import useStyles from './styles';

interface IExerciseCard {
	firstExercise: ExerciseInstance;
	secondExercise: ExerciseInstance;
	sets: number;
}

export const SupersetCard = ({
	firstExercise,
	secondExercise,
	sets,
}: IExerciseCard) => {
	const classes = useStyles();
	const navigateTo = useNavigate();
	const firstExerciseSetsXReps = `${sets} × ${firstExercise.repRange}`;
	const secondExerciseSetsXReps = `${sets} × ${secondExercise.repRange}`;

	const handleNavigate = (index: number) => {
		if (index === 1) {
			navigateTo(
				`/progress/${exerciseNameToPathConverter(firstExercise.exercise.name)}`
			);
		}
		if (index === 2) {
			navigateTo(
				`/progress/${exerciseNameToPathConverter(secondExercise.exercise.name)}`
			);
		}
	};

	return (
		<Box className={classes.container}>
			<Grid item container className={classes.exerciseContainer}>
				<Grid item container direction="column">
					<Typography variant="subtitle1">
						{firstExercise.exercise.name}
					</Typography>
					<Grid item container className={classes.setsXrepsContainer}>
						<ReplayRounded className={classes.icon} fontSize="small" />
						<Typography variant="body1" className={classes.setsXreps}>
							{firstExerciseSetsXReps}
						</Typography>
					</Grid>
				</Grid>
				<IconButton
					className={classes.progressButton}
					onClick={() => handleNavigate(1)}
				>
					<ProgressIcon />
				</IconButton>
			</Grid>
			<Grid item container className={classes.exerciseContainer}>
				<Grid item container direction="column">
					<Typography variant="subtitle1">
						{secondExercise.exercise.name}
					</Typography>
					<Grid item container className={classes.setsXrepsContainer}>
						<ReplayRounded className={classes.icon} fontSize="small" />
						<Typography variant="body1" className={classes.setsXreps}>
							{secondExerciseSetsXReps}
						</Typography>
					</Grid>
				</Grid>
				<IconButton
					className={classes.progressButton}
					onClick={() => handleNavigate(2)}
				>
					<ProgressIcon />
				</IconButton>
			</Grid>
		</Box>
	);
};

export default SupersetCard;
