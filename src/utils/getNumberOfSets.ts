import { DocumentData } from 'firebase/firestore';
import { ExerciseInstance, Workout } from '../types';

export const getNumberOfSets = (workout: Workout | DocumentData) => {
	const setsArray: number[] = [];
	// workouts.forEach((workout) => {
	workout.exercises.forEach((exercise: ExerciseInstance) => {
		setsArray.push(exercise.sets);
	});
	// });
	if (setsArray.length > 1) {
		const totalSets = setsArray.reduce((a, b) => a + b, 0);
		return totalSets;
	} else {
		return setsArray[0];
	}
};
