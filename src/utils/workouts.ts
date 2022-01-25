import { muscleGroupEnum } from '.';
import { Workout } from '../types';

export const workouts: Workout[] = [
	{
		name: 'Chest & Biceps 1',
		// path: workoutNameToPathConverter('Chest & Biceps 1'),
		targetMuscles: [muscleGroupEnum.CHEST, muscleGroupEnum.BICEPS],
		exercises: [
			{
				exercise: {
					name: 'Incline Dumbbell Press',
					targetMuscles: [muscleGroupEnum.CHEST],
					progress: [],
				},
				sets: 4,
				repRange: '6-12',
			},
			{
				exercise: {
					name: 'Flat Machine Press',
					targetMuscles: [muscleGroupEnum.CHEST],
					progress: [],
				},
				sets: 3,
				repRange: '8-12',
			},
			{
				exercise: {
					name: 'High Cable Fly',
					targetMuscles: [muscleGroupEnum.CHEST],
					progress: [],
				},
				sets: 3,
				repRange: '10-20',
			},
			{
				exercise: {
					name: 'Machine Preacher Curl',
					targetMuscles: [muscleGroupEnum.BICEPS],
					progress: [],
				},
				sets: 4,
				repRange: '10-20',
			},
			{
				exercise: {
					name: 'Incline Dumbbell Curl',
					targetMuscles: [muscleGroupEnum.BICEPS],
					progress: [],
				},
				sets: 4,
				repRange: '8-12',
			},
		],
	},
	{
		name: 'Legs 1',
		// path: workoutNameToPathConverter('Legs 1'),
		targetMuscles: [muscleGroupEnum.LEGS],
		exercises: [
			{
				exercise: {
					name: 'Hack Squat',
					targetMuscles: [muscleGroupEnum.QUADS, muscleGroupEnum.GLUTES],
					progress: [],
				},
				sets: 4,
				repRange: '6-12',
			},
			{
				exercise: {
					name: 'Narrow Leg Press',
					targetMuscles: [muscleGroupEnum.QUADS, muscleGroupEnum.GLUTES],
					progress: [],
				},
				sets: 4,
				repRange: '8-12',
			},
			{
				exercise: {
					name: 'Seated Leg Curl',
					targetMuscles: [muscleGroupEnum.HAMSTRINGS],
					progress: [],
				},
				sets: 3,
				repRange: '10-20',
			},
			{
				exercise: {
					name: 'Hip Adductor',
					targetMuscles: [muscleGroupEnum.ADDUCTORS],
					progress: [],
				},
				sets: 4,
				repRange: '10-20',
			},
			{
				exercise: {
					name: 'Leg Extension',
					targetMuscles: [muscleGroupEnum.QUADS],
					progress: [],
				},
				sets: 4,
				repRange: '10-20',
			},
		],
	},
	{
		name: 'Shoulders & Triceps 1',
		// path: workoutNameToPathConverter('Shoulders & Triceps 1'),
		targetMuscles: [muscleGroupEnum.SHOULDERS, muscleGroupEnum.TRICEPS],
		exercises: [
			{
				exercise: {
					name: 'Seated Dumbbell Press',
					targetMuscles: [
						muscleGroupEnum.FRONT_DELTS,
						muscleGroupEnum.SIDE_DELTS,
					],
					progress: [],
				},
				sets: 4,
				repRange: '6-12',
			},
			{
				exercise: {
					name: 'Dumbbell Lateral Raise',
					targetMuscles: [muscleGroupEnum.SIDE_DELTS],
					progress: [],
				},
				sets: 4,
				repRange: '10-20',
			},
			{
				exercise: {
					name: 'Incline Rear Delt Fly',
					targetMuscles: [muscleGroupEnum.REAR_DELTS],
					progress: [],
				},
				sets: 3,
				repRange: '10-20',
			},
			{
				exercise: {
					name: 'Incline Skull Crusher',
					targetMuscles: [muscleGroupEnum.TRICEPS],
					progress: [],
				},
				sets: 4,
				repRange: '10-20',
			},
			{
				exercise: {
					name: 'Tricep Pushdown',
					targetMuscles: [muscleGroupEnum.TRICEPS],
					progress: [],
				},
				sets: 4,
				repRange: '10-20',
			},
		],
	},
	{
		name: 'Back & Abs 1',
		// path: workoutNameToPathConverter('Back & Abs 1'),
		targetMuscles: [muscleGroupEnum.BACK, muscleGroupEnum.ABS],
		exercises: [
			{
				exercise: {
					name: 'Barbell Row',
					targetMuscles: [muscleGroupEnum.BACK],
					progress: [],
				},
				sets: 5,
				repRange: '8-12',
			},
			{
				exercise: {
					name: 'Lat Pulldown',
					targetMuscles: [muscleGroupEnum.BACK],
					progress: [],
				},
				sets: 4,
				repRange: '10-15',
			},
			{
				exercise: {
					name: 'Seated Cable Row',
					targetMuscles: [muscleGroupEnum.BACK],
					progress: [],
				},
				sets: 3,
				repRange: '10-20',
			},
			{
				exercise: {
					name: 'Barbell Shrug',
					targetMuscles: [muscleGroupEnum.TRAPS],
					progress: [],
				},
				sets: 4,
				repRange: '10-20',
			},
			{
				exercise: {
					name: 'Cable Crunches',
					targetMuscles: [muscleGroupEnum.ABS],
					progress: [],
				},
				sets: 4,
				repRange: '10-20',
			},
		],
	},
];

export default workouts;
