import { Grid, Button, Typography } from '@material-ui/core';
import { AddRounded, EditRounded } from '@material-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';

import useStyles from './styles';
import { Page, TitleHeader } from '../../components';
import { pathToWorkoutNameConverter, workouts } from '../../utils';
import { Exercise, ExerciseInstance, Workout } from '../../types';
import { useState } from 'react';

export const WorkoutPage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();
	const { name } = useParams();
	const workoutNameFromPath = pathToWorkoutNameConverter(name!);
	const [workout, setWorkout] = useState<Workout>({
		name: '',
		targetMuscles: [],
		exercises: [],
	});

	const HeaderButton = () => (
		<Button
			endIcon={<EditRounded fontSize="small" />}
			className={classes.headerButton}
			color="secondary"
			variant="contained"
			onClick={handleNavigate}
		>
			Ändra
		</Button>
	);

	const handleNavigate = () => {
		navigateTo('/link');
	};

	const workoutObject = workouts.find(
		(workout) => workout.name === workoutNameFromPath
	);

	return (
		<Page title={workoutNameFromPath}>
			<Grid item container direction="column">
				<TitleHeader
					title={workoutNameFromPath}
					titleSize="small"
					navigateBackButton
					navigateTo="back"
					button={<HeaderButton />}
				/>
			</Grid>
			{workoutObject!.exercises.map((exercise: ExerciseInstance) => (
				<Grid item container direction="column">
					<Typography>{exercise.exercise.name}</Typography>
					<Typography>{exercise.sets + ' × ' + exercise.repRange}</Typography>
					{/* <Typography>{exercise.repRange}</Typography> */}
				</Grid>
			))}
		</Page>
	);
};

export default WorkoutPage;
