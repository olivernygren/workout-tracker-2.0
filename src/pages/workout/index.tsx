import { useEffect, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { EditRounded } from '@material-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, DocumentData, getDocs } from '@firebase/firestore';

import useStyles from './styles';
import {
	ExerciseCard,
	Page,
	Spinner,
	SupersetCard,
	TitleHeader,
} from '../../components';
import { pathToWorkoutNameConverter } from '../../utils';
import { db } from '../../firebase-config';

export const WorkoutPage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();
	const { name } = useParams();
	const workoutNameFromPath = pathToWorkoutNameConverter(name!);

	const workoutsCollectionRef = collection(db, 'workouts');
	const [workout, setWorkout] = useState<DocumentData>({
		name: '',
		exercises: [],
		targetMuscles: [],
		path: '',
		createdAt: '',
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// setIsLoading(true);
		const getWorkouts = async () => {
			const data = await getDocs(workoutsCollectionRef);
			const workouts = data.docs.map((doc) => doc.data());
			// const sortedWorkouts = workouts.sort((a, b) => {
			// 	return a.createdAt - b.createdAt;
			// });
			const matchingWorkout = workouts.find(
				(workout) =>
					workout.name.toLowerCase() === workoutNameFromPath.toLowerCase()
			);
			setWorkout(matchingWorkout!);
		};
		getWorkouts();
		setIsLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

	// const workoutObject = sortedWorkouts.find(
	// 	(workout) =>
	// 		workout.name.toLowerCase() === workoutNameFromPath.toLowerCase()
	// );
	const ExerciseList = () => {
		const exerciseArray = workout!.exercises.map((segment: any) =>
			segment.firstExercise ? (
				<SupersetCard
					firstExercise={segment.firstExercise}
					secondExercise={segment.secondExercise}
					sets={segment.sets}
				/>
			) : (
				<ExerciseCard
					exercise={segment.exercise.name}
					sets={segment.sets!}
					repRange={segment.repRange}
					key={segment.exercise.name}
				/>
			)
		);
		return exerciseArray;
	};

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
				{isLoading ? <Spinner /> : <ExerciseList />}
			</Grid>
		</Page>
	);
};

export default WorkoutPage;
