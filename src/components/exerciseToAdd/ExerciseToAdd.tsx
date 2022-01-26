import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Exercise, ExerciseInstance } from '../../types';
import { StyledTextField } from '../muiTextField';

import useStyles from './styles';

interface IExerciseToAdd {
	exercise: Exercise;
	// onChangeSets: () => void;
	// onChangeReps: () => void;
}

export const ExerciseToAdd = ({
	exercise,
}: // onChangeSets,
// onChangeReps,
IExerciseToAdd) => {
	const classes = useStyles();
	const [exerciseInstance, setExerciseInstance] = useState<ExerciseInstance>({
		exercise: { name: exercise.name, targetMuscles: exercise.targetMuscles },
		sets: 0,
		repRange: '',
		RIR: undefined,
	});

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

	console.log(exerciseInstance);
	// const logValue = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	console.log(name + event.target.value);
	// };
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
		</Grid>
	);
};

export default ExerciseToAdd;
