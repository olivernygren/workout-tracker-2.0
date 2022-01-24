export type ProgressSegment = {
	microcycle?: number | string;
	setIndex: number;
	reps: number;
	weight: number;
};

export type Exercise = {
	name: string;
	targetMuscles: string[];
	progress?: ProgressSegment[];
};

export type ExerciseInstance = {
	exercise: Exercise;
	sets: number;
	repRange: string;
	RIR?: number;
};

export type Workout = {
	name: string;
	exercises: ExerciseInstance[];
	targetMuscles: string[];
	path?: string;
};

export type Program = {
	name: string;
	workouts: Workout[];
	durationInWeeks: number;
};
