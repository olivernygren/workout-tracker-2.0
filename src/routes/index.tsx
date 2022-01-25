import { AllWorkoutsPage, CreateWorkoutPage, WorkoutPage } from '../pages';
import HomePage from '../pages/home';

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
];
