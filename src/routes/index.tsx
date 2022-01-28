import {
	AllWorkoutsPage,
	CreateWorkoutPage,
	ProgressPage,
	WorkoutPage,
	HomePage,
	ExerciseProgressPage,
} from '../pages';

export const routes = [
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/all-workouts',
		element: <AllWorkoutsPage />,
	},
	{
		path: '/workout/:name',
		element: <WorkoutPage />,
	},
	{
		path: '/create-workout',
		element: <CreateWorkoutPage />,
	},
	{
		path: '/progress',
		element: <ProgressPage />,
	},
	{
		path: '/progress/:name',
		element: <ExerciseProgressPage />,
	},
];
