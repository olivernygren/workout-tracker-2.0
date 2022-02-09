import {
	AllWorkoutsPage,
	CreateWorkoutPage,
	ProgressPage,
	WorkoutPage,
	HomePage,
	ExerciseProgressPage,
	CreateExercisePage,
	BodyweightPage,
	ChecklistPage,
	AddChecklistItemPage,
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
	{
		path: '/db',
		element: <CreateExercisePage />,
	},
	{
		path: '/weight',
		element: <BodyweightPage />,
	},
	{
		path: '/checklist',
		element: <ChecklistPage />,
	},
	{
		path: '/add-checklist-item',
		element: <AddChecklistItemPage />,
	},
];
