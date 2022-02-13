export type ProgressInstance = {
	reps: number;
	weight: number;
};

export type ProgressSegment = {
	date?: string;
	progressInstances: ProgressInstance[];
	progressMade?: boolean;
	notes?: string;
};

export type Exercise = {
	name: string;
	targetMuscles: string[];
	progress?: ProgressSegment[];
};

export type Superset = {
	firstExercise: ExerciseInstance;
	secondExercise: ExerciseInstance;
	sets: number;
};

export type ExerciseInstance = {
	exercise: Exercise;
	sets?: number;
	repRange: string;
	RIR?: number | null;
};

export type Workout = {
	name: string;
	exercises: ExerciseInstance[];
	targetMuscles: string[];
	path?: string;
	createdAt?: string;
};

export type Program = {
	name: string;
	workouts: Workout[];
	durationInWeeks?: number;
};

export type SleepRecord = {
	date: string;
	time: string;
};

export type WeightRecord = {
	date: string;
	weight: string;
};

export type ChecklistItemRecord = {
	label: string;
	category: string;
	checked: boolean;
	id: string;
};

export type EvaluationRecord = {
	date: string;
	food: number;
	sleep: number;
	cardio: number;
	training: number;
	productivity: number;
	wellBeing: number;
	dailySatisfaction: string;
};
