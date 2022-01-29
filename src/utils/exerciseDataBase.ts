import { muscleGroupEnum } from '.';
import { Exercise } from '../types';

const exercises: Exercise[] = [
	{
		name: 'Incline Dumbbell Press',
		targetMuscles: [muscleGroupEnum.CHEST, muscleGroupEnum.UPPER_CHEST],
		progress: [],
	},
	{
		name: 'Incline Smith Machine Press',
		targetMuscles: [muscleGroupEnum.CHEST, muscleGroupEnum.UPPER_CHEST],
		progress: [],
	},
	{
		name: 'Machine Shoulder Press',
		targetMuscles: [muscleGroupEnum.SHOULDERS, muscleGroupEnum.FRONT_DELTS],
		progress: [],
	},
	{
		name: 'Tricep Pushdown',
		targetMuscles: [muscleGroupEnum.TRICEPS],
		progress: [],
	},
	{
		name: 'Tricep Rope Pushdown',
		targetMuscles: [muscleGroupEnum.TRICEPS],
		progress: [],
	},
	{
		name: 'Wide Grip Lat Pulldown',
		targetMuscles: [muscleGroupEnum.BACK, muscleGroupEnum.LATS],
		progress: [],
	},
	{
		name: 'Close Grip Pulldown',
		targetMuscles: [muscleGroupEnum.BACK, muscleGroupEnum.LATS],
		progress: [],
	},
	{
		name: 'Cable Curl',
		targetMuscles: [muscleGroupEnum.BICEPS],
		progress: [],
	},
	{
		name: 'Hack Squat',
		targetMuscles: [
			muscleGroupEnum.LEGS,
			muscleGroupEnum.QUADS,
			muscleGroupEnum.GLUTES,
		],
		progress: [
			{
				date: '220129',
				progressInstances: [
					{ setIndex: 1, weight: 200, reps: 10 },
					{ setIndex: 2, weight: 210, reps: 10 },
					{ setIndex: 3, weight: 220, reps: 9 },
					{ setIndex: 4, weight: 230, reps: 8 },
				],
			},
			{
				date: '220130',
				progressInstances: [
					{ setIndex: 1, weight: 210, reps: 12 },
					{ setIndex: 2, weight: 220, reps: 10 },
					{ setIndex: 3, weight: 230, reps: 9 },
					{ setIndex: 4, weight: 240, reps: 8 },
				],
			},
		],
	},
	{
		name: 'Hip Adductor',
		targetMuscles: [muscleGroupEnum.LEGS, muscleGroupEnum.ADDUCTORS],
		progress: [],
	},
];

export const exerciseDatabase = exercises.sort((a, b) => {
	const nameA = a.name.toLowerCase(),
		nameB = b.name.toLowerCase();
	if (nameA < nameB) return -1;
	if (nameA > nameB) return 1;
	return 0;
});
