import { AllWorkoutsPage } from '../pages';
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
];
