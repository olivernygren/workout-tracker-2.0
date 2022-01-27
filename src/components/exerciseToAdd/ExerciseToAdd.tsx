import { Grid, IconButton, Typography } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import { Exercise, ExerciseInstance } from '../../types';
import { StyledTextField } from '../muiTextField';

import useStyles from './styles';

interface IExerciseToAdd {
	exercise: Exercise;
	passChildData: React.Dispatch<React.SetStateAction<ExerciseInstance[]>>;
	// onChangeSets: () => void;
	// onChangeReps: () => void;
}

export const ExerciseToAdd = ({
	exercise,
	passChildData,
}: // onChangeSets,
// onChangeReps,
IExerciseToAdd) => {
	const classes = useStyles();
	const defaultExerciseInstance = {
		exercise: { name: exercise.name, targetMuscles: exercise.targetMuscles },
		sets: 0,
		repRange: '',
		RIR: undefined,
	};

	const [exerciseInstance, setExerciseInstance] = useState<ExerciseInstance>(
		defaultExerciseInstance
	);
	const [exerciseArray, setExerciseArray] = useState<ExerciseInstance[]>([]);

	const handleChangeSets = (event: React.ChangeEvent<HTMLInputElement>) => {
		setExerciseInstance((oldstate) => ({
			...oldstate,
			sets: parseInt(event.target.value),
		}));
	};

	const handleChangeReps = (event: React.ChangeEvent<HTMLInputElement>) => {
		setExerciseInstance((oldstate) => ({
			...oldstate,
			repRange: event.target.value,
		}));
	};

	const logExerciseInstance = () => {
		console.log(exerciseInstance);
		exerciseArray.push(exerciseInstance);
		setExerciseInstance(defaultExerciseInstance);
		console.log(exerciseArray);
	};

	// skicka exerciseInstance till createWorkoutPage till exercises arrayn
	return (
		<Grid item container className={classes.container}>
			<Typography variant="body1">{exercise.name}</Typography>
			<Grid item container className={classes.inputContainer}>
				<StyledTextField tiny onChange={handleChangeSets} />
				<Typography variant="body1" className={classes.xSign}>
					×
				</Typography>
				<StyledTextField small onChange={handleChangeReps} />
			</Grid>
			<IconButton onClick={logExerciseInstance}>
				<AddRounded color="primary" />
			</IconButton>
		</Grid>
	);
};

export default ExerciseToAdd;
