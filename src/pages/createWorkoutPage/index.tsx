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
	Modal,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { AddRounded, SearchRounded } from '@material-ui/icons';
import { useState } from 'react';

import useStyles from './styles';
import { Page, StyledTextField, TitleHeader } from '../../components';
import {
	exerciseDatabase,
	muscleGroups,
	workoutNameToPathConverter,
	workouts,
} from '../../utils';
import { Exercise, ExerciseInstance, Workout } from '../../types';

export const CreateWorkoutPage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();
	const defualtExerciseInstance = {
		exercise: { name: '', targetMuscles: [] },
		sets: 0,
		repRange: '',
		RIR: undefined,
	};

	const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>(
		[]
	);
	const [workoutName, setWorkoutName] = useState('');
	const [exercisesList] = useState<ExerciseInstance[]>([]);
	const [searchResults, setSearchResults] = useState<Exercise[]>([]);
	const [searchValue, setSearchValue] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalErrorMessage, setModalErrorMessage] = useState('');
	const [createErrorMessage, setCreateErrorMessage] = useState('');
	const [exerciseToAdd, setExerciseToAdd] = useState<ExerciseInstance>(
		defualtExerciseInstance
	);
	const [workout, setWorkout] = useState<Workout>({
		name: '',
		exercises: [],
		targetMuscles: [],
		path: '',
	});

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
		setSearchValue(event.target.value);
		searchFunction(event.target.value);
	};

	const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setWorkoutName(event.target.value);
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
		// filter out the item of the array that is equal to muscleGroup
		const filteredArray = selectedMuscleGroups.filter(
			(mg) => mg !== muscleGroup
		);
		setSelectedMuscleGroups(filteredArray);
	};

	const handleSetModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const handleSetActiveExercise = (exercise: Exercise) => {
		setExerciseToAdd((oldstate) => ({
			...oldstate,
			exercise: { name: exercise.name, targetMuscles: exercise.targetMuscles },
		}));
		setSearchValue('');
		handleSetModal();
	};

	const handleUpdateSets = (event: React.ChangeEvent<HTMLInputElement>) => {
		setExerciseToAdd((oldstate) => ({
			...oldstate,
			sets: parseInt(event.target.value),
		}));
	};

	const handleUpdateReps = (event: React.ChangeEvent<HTMLInputElement>) => {
		setExerciseToAdd((oldstate) => ({
			...oldstate,
			repRange: event.target.value,
		}));
	};

	const handleAddExerciseToList = () => {
		if (exerciseToAdd.sets === 0 || exerciseToAdd.repRange === '') {
			setModalErrorMessage('Fyll i fälten');
			return;
		} else {
			setModalErrorMessage('');
		}
		exercisesList.push(exerciseToAdd);
		setIsModalOpen(false);
		setExerciseToAdd(defualtExerciseInstance);
	};

	const handleCreateWorkout = () => {
		if (workoutName === '' || selectedMuscleGroups.length === 0) {
			setCreateErrorMessage('Fyll i namn och muskelgrupper');
			return;
		}
		setWorkout({
			name: workoutName,
			exercises: exercisesList,
			targetMuscles: selectedMuscleGroups,
			path: workoutNameToPathConverter(workoutName),
		});
	};

	// Detect if workout has been set to valid, then validate and push
	if (workout.exercises.length > 0) {
		//prevent duplicates of same workout
		const workoutNameArray: string[] = [];
		workouts.forEach((w) => {
			workoutNameArray.push(w.name);
		});
		if (!workoutNameArray.includes(workout.name)) {
			workouts.push(workout);
		}
		//reset workout state after pushing
		setWorkout({
			name: '',
			exercises: [],
			targetMuscles: [],
			path: '',
		});
		navigateTo('/all-workouts');
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
							// IconComponent={() => (
							// 	<ExpandMoreRounded className={classes.selectIcon} />
							// )}
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
					{/* <Button
						endIcon={<AddRounded />}
						className={classes.headerButton}
						disableElevation
						color="primary"
						variant="contained"
						onClick={handleSetModal}
					>
						Lägg till
					</Button> */}
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
						value={searchValue}
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
										onClick={() => handleSetActiveExercise(exercise)}
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
						{exercisesList.map((exercise) => (
							<Grid item container className={classes.exerciseToAddContainer}>
								<Typography variant="body1">
									{exercise.exercise.name}
								</Typography>
								<Grid
									item
									container
									className={classes.exerciseToAddInputContainer}
								>
									<Typography variant="body1">{exercise.sets}</Typography>
									<Typography variant="body1" className={classes.xSignList}>
										×
									</Typography>
									<Typography variant="body1">{exercise.repRange}</Typography>
								</Grid>
							</Grid>
						))}
					</Grid>
					<Typography variant="body1" className={classes.modalErrorText}>
						{createErrorMessage}
					</Typography>
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
			{isModalOpen && (
				<Modal
					open={isModalOpen}
					onClose={handleSetModal}
					className={classes.modalContainer}
				>
					<Box>
						<Grid
							item
							container
							direction="column"
							className={classes.modalContentContainer}
						>
							<Typography variant="h6" className={classes.modalExerciseName}>
								{exerciseToAdd.exercise.name}
							</Typography>
							<Grid item container className={classes.modalTextFieldContainer}>
								<StyledTextField
									placeholder="Sets"
									onChange={(event) => handleUpdateSets(event)}
								/>
								<Typography variant="body1" className={classes.xSign}>
									×
								</Typography>
								<StyledTextField
									placeholder="Reps"
									onChange={(event) => handleUpdateReps(event)}
								/>
							</Grid>
							<Typography variant="body1" className={classes.modalErrorText}>
								{modalErrorMessage}
							</Typography>
							<Button
								variant="contained"
								color="primary"
								className={classes.addExerciseButton}
								onClick={handleAddExerciseToList}
								fullWidth
							>
								Lägg till
							</Button>
						</Grid>
					</Box>
				</Modal>
			)}
		</Page>
	);
};

export default CreateWorkoutPage;
