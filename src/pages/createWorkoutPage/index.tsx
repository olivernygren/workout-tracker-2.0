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
	const [exercises, setExercises] = useState<ExerciseInstance[]>([]);
	const [value, setValue] = useState('');
	const [workout, setWorkout] = useState<Workout>({
		name: '',
		exercises: [],
		targetMuscles: [],
		path: '',
	});
	// let selectedMuscleGroups: string[] = [];

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

	const handleSelect = (event: any) => {
		setSelectedMuscleGroups((oldstate) => [...oldstate, event.target.value]);
	};

	const handleDelete = (muscleGroup: string) => {
		const filteredArray = selectedMuscleGroups.filter(
			(mg) => mg !== muscleGroup
		);
		setSelectedMuscleGroups(filteredArray);
	};

	const handleAddExercise = (exercise: Exercise) => {
		setValue('');
		setExercises((oldstate) => [
			...oldstate,
			{ exercise: exercise, sets: 4, repRange: '8-12' },
		]);
		setAddedExercises((oldstate) => [...oldstate, exercise]);
	};

	const handleCreateWorkout = () => {
		setWorkout((oldstate) => ({
			...oldstate,
			targetMuscles: selectedMuscleGroups,
			exercises: exercises,
			path: workoutNameToPathConverter('hej'),
		}));
		console.log(workout);
	};

	// console.log(exercises);
	// console.log(workout);
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
					<Typography variant="subtitle1" className={classes.label}>
						Muskelgrupper
					</Typography>
					<FormControl fullWidth>
						<Select
							id="demo-simple-select"
							className={classes.select}
							placeholder="Välj"
							onChange={handleSelect}
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
								onDelete={() => handleDelete(mg)}
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
						{exercises.length > 0 && (
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
						{exercises.map((exercise, index) => (
							<ExerciseToAdd exercise={addedExercises[index]} />
						))}
					</Grid>
					<Button
						disabled={exercises.length === 0}
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
