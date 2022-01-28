import { Grid, Button } from '@material-ui/core';
import { EditRounded } from '@material-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';

import useStyles from './styles';
import { ExerciseCard, Page, TitleHeader } from '../../components';
import { pathToWorkoutNameConverter, workouts } from '../../utils';
import { ExerciseInstance } from '../../types';
// import { useState } from 'react';

export const WorkoutPage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();
	const { name } = useParams();
	const workoutNameFromPath = pathToWorkoutNameConverter(name!);
	// const [workout, setWorkout] = useState<Workout>({
	// 	name: '',
	// 	targetMuscles: [],
	// 	exercises: [],
	// });

	const HeaderButton = () => (
		<Button
			endIcon={<EditRounded fontSize="small" />}
			className={classes.headerButton}
			disableElevation
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
		(workout) =>
			workout.name.toLowerCase() === workoutNameFromPath.toLowerCase()
	);

	console.log(workoutObject);

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
			<Grid item container direction="column" className={classes.cardContainer}>
				{workoutObject!.exercises.map((exercise: ExerciseInstance) => (
					<ExerciseCard
						exercise={exercise.exercise.name}
						sets={exercise.sets}
						repRange={exercise.repRange}
						key={exercise.exercise.name}
					/>
				))}
			</Grid>
		</Page>
	);
};

export default WorkoutPage;
