import { muscleGroupEnum } from '.';
import { Exercise } from '../types';

export const exerciseDatabase: Exercise[] = [
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
		progress: [],
	},
	{
		name: 'Hip Adductor',
		targetMuscles: [muscleGroupEnum.ADDUCTORS],
		progress: [],
	},
];
