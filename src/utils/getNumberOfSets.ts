import { Workout } from '../types';

export const getNumberOfSets = (workout: Workout) => {
	const setsArray: number[] = [];
	// workouts.forEach((workout) => {
	workout.exercises.forEach((exercise) => {
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
