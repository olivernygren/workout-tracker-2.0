import {
	Grid,
	Typography,
	Select,
	MenuItem,
	FormControl,
	Button,
	Box,
	IconButton,
	Chip,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import {
	ExerciseToAdd,
	Page,
	StyledTextField,
	TitleHeader,
} from '../../components';
import {
	exerciseDatabase,
	muscleGroups,
	workoutNameToPathConverter,
	workouts,
} from '../../utils';
import {
	AddRounded,
	ExpandMoreRounded,
	SearchRounded,
} from '@material-ui/icons';
import { useState } from 'react';
import { Exercise, ExerciseInstance, Workout } from '../../types';

export const CreateWorkoutPage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();
	const [searchResults, setSearchResults] = useState<Exercise[]>([]);
	const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>(
		[]
	);
	const [addedExercises, setAddedExercises] = useState<Exercise[]>([]);
	const [exercisesList, setExercisesList] = useState<ExerciseInstance[]>([]);
	const [finalExercises] = useState<ExerciseInstance[]>([]);
	const [value, setValue] = useState('');
	const [childData, setChildData] = useState<ExerciseInstance[]>([
		{
			exercise: { name: '', targetMuscles: [] },
			sets: 0,
			repRange: '',
			RIR: undefined,
		},
	]);
	const [workout, setWorkout] = useState<Workout>({
		name: '',
		exercises: [],
		targetMuscles: [],
		path: '',
	});

	const handleNavigate = () => {
		navigateTo('/add-exercises');
	};

	const searchFunction = (text: string) => {
		const searchArr = exerciseDatabase.filter((exercise: Exercise) => {
			if (text !== '') {
				return (
					exercise.name.toLowerCase().match(text.toLowerCase()) ||
					exercise.targetMuscles[0].toLowerCase().match(text.toLowerCase())
				);
			} else {
				return '';
			}
		});
		setSearchResults(searchArr);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		searchFunction(event.target.value);
	};

	const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setWorkout((oldstate) => ({
			...oldstate,
			name: event.target.value,
		}));
	};

	const handleBlur = () => {
		setTimeout(() => {
			setSearchResults([]);
		}, 50);
	};

	const handleSelectMuscleGroup = (event: any) => {
		setSelectedMuscleGroups((oldstate) => [...oldstate, event.target.value]);
	};

	const handleDeleteMuscleGroup = (muscleGroup: string) => {
		const filteredArray = selectedMuscleGroups.filter(
			(mg) => mg !== muscleGroup
		);
		setSelectedMuscleGroups(filteredArray);
	};

	const handleAddExercise = (exercise: Exercise) => {
		setValue('');
		setExercisesList((oldstate) => [
			...oldstate,
			{ exercise: exercise, sets: 4, repRange: '8-12' },
		]);
		setAddedExercises((oldstate) => [...oldstate, exercise]);
	};

	const handleCreateWorkout = () => {
		setWorkout((oldstate) => ({
			...oldstate,
			targetMuscles: selectedMuscleGroups,
			exercises: finalExercises,
			path: workoutNameToPathConverter('hej'),
		}));
	};

	const handleUpdateSets = (
		exerciseInstance: ExerciseInstance,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const exerciseInstanceObject = exercisesList.find(
			(exercise) => exercise.exercise.name === exerciseInstance.exercise.name
		)!;
		const withSets = {
			...exerciseInstanceObject,
			sets: parseInt(event.target.value),
		};
		finalExercises.push(withSets);
	};

	const handleUpdateReps = (
		exerciseInstance: ExerciseInstance,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		// find exercise in list to add reps to
		const exerciseObject = finalExercises.find(
			(exercise) => exercise.exercise.name === exerciseInstance.exercise.name
		)!;
		// find index of exercise in list to add reps to
		const exerciseObjectIndex = finalExercises.findIndex(
			(exercise) => exercise.exercise.name === exerciseInstance.exercise.name
		)!;
		// change the repRange of the object
		const withReps = { ...exerciseObject, repRange: event.target.value };
		// replace the object of name and sets with the reps included object
		finalExercises.splice(exerciseObjectIndex, 1, withReps);
	};

	if (workout.exercises.length > 0) {
		const nameArray: string[] = [];
		workouts.forEach((w) => {
			nameArray.push(w.name);
		});
		if (!nameArray.includes(workout.name)) {
			workouts.push(workout);
		}
	}

	return (
		<Page title="Skapa pass">
			<TitleHeader title="Skapa pass" navigateBackButton navigateTo="back" />
			<Grid
				item
				container
				direction="column"
				className={classes.contentContainer}
			>
				<Grid item>
					<Typography variant="subtitle1" className={classes.label}>
						Namn
					</Typography>
					<StyledTextField fullWidth onChange={handleSetName} />
				</Grid>
				<Grid item>
					<Typography
						variant="subtitle1"
						className={`${classes.label} ${classes.marginTop}`}
					>
						Muskelgrupper
					</Typography>
					<FormControl fullWidth>
						<Select
							id="demo-simple-select"
							className={classes.select}
							placeholder="Välj"
							onChange={handleSelectMuscleGroup}
							IconComponent={() => <ExpandMoreRounded />}
							MenuProps={{
								classes: { paper: classes.selectMenu },
							}}
						>
							{muscleGroups.map((muscleGroup) => (
								<MenuItem value={muscleGroup} className={classes.menuItem}>
									{muscleGroup}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Grid item container className={classes.chipContainer}>
						{selectedMuscleGroups.map((mg) => (
							<Chip
								label={mg}
								className={classes.chip}
								onDelete={() => handleDeleteMuscleGroup(mg)}
							/>
						))}
					</Grid>
				</Grid>
				<Grid item container className={classes.exercisesHeader}>
					<Typography variant="h5" className={classes.label}>
						Övningar
					</Typography>
					<Button
						endIcon={<AddRounded />}
						className={classes.headerButton}
						disableElevation
						color="primary"
						variant="contained"
						onClick={handleNavigate}
					>
						Lägg till
					</Button>
				</Grid>
				<Grid
					container
					item
					direction="column"
					className={classes.exercisesContainer}
				>
					<StyledTextField
						placeholder="Sök"
						icon={{ element: <SearchRounded />, position: 'start' }}
						onChange={handleChange}
						onBlur={handleBlur}
						value={value}
					/>
					{searchResults.length > 0 && (
						<Box className={classes.searchResultsContainer}>
							{searchResults.map((exercise) => (
								<Grid item container className={classes.searchResult}>
									<Grid item container>
										<Typography variant="body1">{exercise.name}</Typography>
										<Typography
											variant="body1"
											className={classes.searchResultSeparator}
										>
											/
										</Typography>
										<Typography
											variant="body2"
											className={classes.searchResultTargetMuscle}
										>
											{exercise.targetMuscles[0]}
										</Typography>
									</Grid>
									<IconButton
										className={classes.searchResultAddIconButton}
										onClick={() => handleAddExercise(exercise)}
									>
										<AddRounded
											className={classes.searchResultIcon}
											fontSize="small"
										/>
									</IconButton>
								</Grid>
							))}
						</Box>
					)}
					<Grid item container className={classes.exerciseListContainer}>
						{exercisesList.length > 0 && (
							<Grid item container className={classes.exerciseListHeader}>
								<Typography
									variant="body2"
									className={classes.exerciseListHeaderSets}
								>
									Set
								</Typography>
								<Typography
									variant="body2"
									className={classes.exerciseListHeaderReps}
								>
									Reps
								</Typography>
							</Grid>
						)}
						{exercisesList.map((exercise, index) => (
							<Grid item container className={classes.exerciseToAddContainer}>
								<Typography variant="body1">
									{exercise.exercise.name}
								</Typography>
								<Grid
									item
									container
									className={classes.exerciseToAddInputContainer}
								>
									<StyledTextField
										tiny
										// value={setsValue}
										onChange={(event) => handleUpdateSets(exercise, event)}
									/>
									<Typography variant="body1" className={classes.xSign}>
										×
									</Typography>
									<StyledTextField
										small
										// value={repsValue}
										onChange={(event) => handleUpdateReps(exercise, event)}
									/>
								</Grid>
							</Grid>
						))}
					</Grid>
					<Button
						disabled={exercisesList.length === 0}
						variant="contained"
						color="primary"
						className={classes.confirmButton}
						onClick={handleCreateWorkout}
						fullWidth
					>
						Bekräfta
					</Button>
				</Grid>
			</Grid>
		</Page>
	);
};

export default CreateWorkoutPage;
