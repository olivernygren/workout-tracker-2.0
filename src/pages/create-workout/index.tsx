import React, { useEffect, useState } from 'react';
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
import { addDoc, collection, DocumentData, getDocs } from '@firebase/firestore';

import useStyles from './styles';
import { Page, StyledTextField, TitleHeader } from '../../components';
import {
	getCurrentTime,
	muscleGroups,
	workoutNameToPathConverter,
	workouts,
} from '../../utils';
import { Exercise, ExerciseInstance, Superset, Workout } from '../../types';
import { db } from '../../firebase-config';

export const CreateWorkoutPage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();
	const defualtExerciseInstance = {
		exercise: { name: '', targetMuscles: [] },
		sets: 0,
		repRange: '',
		RIR: null,
	};
	const defualtSupersetInstance: Superset = {
		sets: 0,
		firstExercise: { exercise: { name: '', targetMuscles: [] }, repRange: '' },
		secondExercise: { exercise: { name: '', targetMuscles: [] }, repRange: '' },
	};
	const workoutsCollectionRef = collection(db, 'workouts');
	const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>(
		[]
	);
	const [workoutName, setWorkoutName] = useState('');
	const [exercisesList] = useState<any[]>([]);
	const [searchResults, setSearchResults] = useState<
		Exercise[] | DocumentData[]
	>([]);
	const [supersetSearchResults, setSupersetSearchResults] = useState<
		Exercise[] | DocumentData[] | any[]
	>([]);
	const [searchValue, setSearchValue] = useState('');
	const [isExerciseModalOpen, setIsModalOpen] = useState(false);
	const [isSupersetModalOpen, setIsSupersetModalOpen] = useState(false);
	const [modalErrorMessage, setModalErrorMessage] = useState('');
	const [createErrorMessage, setCreateErrorMessage] = useState('');
	const [exerciseToAdd, setExerciseToAdd] = useState<ExerciseInstance>(
		defualtExerciseInstance
	);
	const [supersetToAdd, setSupersetToAdd] = useState<Superset>(
		defualtSupersetInstance
	);
	const [workout, setWorkout] = useState<Workout>({
		name: '',
		exercises: [],
		targetMuscles: [],
		path: '',
		createdAt: '',
	});
	const [exercises, setExercises] = useState<DocumentData[]>([]);
	const exercisesCollectionRef = collection(db, 'exercises');

	useEffect(() => {
		const getExercises = async () => {
			const data = await getDocs(exercisesCollectionRef);
			const exercisesFromDB = data.docs.map((doc) => doc.data());
			if (exercisesFromDB.length > 1) {
				const sortedExercises = exercisesFromDB.sort((a, b) => {
					const nameA = a.name.toLowerCase(),
						nameB = b.name.toLowerCase();
					if (nameA < nameB) return -1;
					if (nameA > nameB) return 1;
					return 0;
				});
				setExercises(sortedExercises);
			}
		};
		getExercises();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const searchFunction = (text: string, type: 'superset' | 'default') => {
		const searchArr = exercises.filter((exercise) => {
			if (text !== '') {
				return (
					exercise.name.toLowerCase().match(text.toLowerCase()) ||
					exercise.targetMuscles[0].toLowerCase().match(text.toLowerCase())
				);
			} else {
				return '';
			}
		});
		if (type === 'default') setSearchResults(searchArr);
		if (type === 'superset') setSupersetSearchResults(searchArr);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
		searchFunction(event.target.value, 'default');
	};

	const handleSupersetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
		searchFunction(event.target.value, 'superset');
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
			setSupersetSearchResults([]);
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

	const handleSetExerciseModal = () => {
		setIsModalOpen(!isExerciseModalOpen);
	};

	const handleSetSupersetModal = () => {
		setIsSupersetModalOpen(!isSupersetModalOpen);
		setSupersetToAdd(defualtSupersetInstance);
	};

	const handleSetActiveExercise = (exercise: Exercise | DocumentData) => {
		setExerciseToAdd((oldstate) => ({
			...oldstate,
			exercise: { name: exercise.name, targetMuscles: exercise.targetMuscles },
		}));
		setSearchValue('');
		handleSetExerciseModal();
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

	const handleUpdateSuperset = (
		field: string,
		event?: React.ChangeEvent<HTMLInputElement>,
		exercise?: Exercise
	) => {
		if (field === 'sets') {
			setSupersetToAdd((oldstate) => ({
				...oldstate,
				sets: parseInt(event!.target.value),
			}));
			return;
		}
		if (field === 'exercise') {
			if (supersetToAdd.firstExercise.exercise.name === '') {
				setSupersetToAdd((oldstate) => ({
					...oldstate,
					firstExercise: {
						...supersetToAdd.firstExercise,
						exercise: exercise!,
					},
				}));
				return;
			}
			if (supersetToAdd.secondExercise.exercise.name === '') {
				setSupersetToAdd((oldstate) => ({
					...oldstate,
					secondExercise: {
						...supersetToAdd.secondExercise,
						exercise: exercise!,
					},
				}));
				return;
			}
		}
		// if (field === 'firstExercise.exercise') {
		// 	setSupersetToAdd((oldstate) => ({
		// 		...oldstate,
		// 		firstExercise: { ...supersetToAdd.firstExercise, exercise: exercise! },
		// 	}));
		// 	return;
		// }
		// if (field === 'secondExercise.exercise') {
		// 	setSupersetToAdd((oldstate) => ({
		// 		...oldstate,
		// 		secondExercise: {
		// 			...supersetToAdd.secondExercise,
		// 			exercise: exercise!,
		// 		},
		// 	}));
		// 	return;
		// }
		if (field === 'firstExercise.repRange') {
			setSupersetToAdd((oldstate) => ({
				...oldstate,
				firstExercise: {
					...supersetToAdd.firstExercise,
					repRange: event!.target.value,
				},
			}));
			return;
		}
		if (field === 'secondExercise.repRange') {
			setSupersetToAdd((oldstate) => ({
				...oldstate,
				secondExercise: {
					...supersetToAdd.secondExercise,
					repRange: event!.target.value,
				},
			}));
			return;
		}
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

	const handleAddSupersetToList = () => {
		if (supersetToAdd.sets === 0) {
			setModalErrorMessage('Fyll i fälten');
			return;
		} else {
			setModalErrorMessage('');
		}
		exercisesList.push(supersetToAdd);
		setIsSupersetModalOpen(false);
		setSupersetToAdd(defualtSupersetInstance);
	};

	const handleCreateWorkout = async () => {
		if (workoutName === '' || selectedMuscleGroups.length === 0) {
			setCreateErrorMessage('Fyll i namn och muskelgrupper');
			return;
		}
		await addDoc(workoutsCollectionRef, {
			name: workoutName,
			exercises: exercisesList,
			targetMuscles: selectedMuscleGroups,
			path: workoutNameToPathConverter(workoutName),
			createdAt: getCurrentTime(),
		});
		setWorkout({
			name: workoutName,
			exercises: exercisesList,
			targetMuscles: selectedMuscleGroups,
			path: workoutNameToPathConverter(workoutName),
			createdAt: getCurrentTime(),
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
			createdAt: '',
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
					<Button
						endIcon={<AddRounded />}
						className={classes.headerButton}
						color="secondary"
						disableElevation
						variant="contained"
						onClick={handleSetSupersetModal}
					>
						Superset
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
						{exercisesList.map((segment) =>
							segment.firstExercise ? (
								<Grid
									item
									container
									direction="column"
									className={classes.supersetInListContainer}
								>
									<Grid
										item
										container
										className={classes.exerciseToAddContainer}
									>
										<Typography variant="body1">
											{segment.firstExercise.exercise.name}
										</Typography>
										<Grid
											item
											container
											className={classes.exerciseToAddInputContainer}
										>
											<Typography variant="body1">{segment.sets}</Typography>
											<Typography variant="body1" className={classes.xSignList}>
												×
											</Typography>
											<Typography variant="body1">
												{segment.firstExercise.repRange}
											</Typography>
										</Grid>
									</Grid>
									<Grid
										item
										container
										className={classes.exerciseToAddContainer}
									>
										<Typography variant="body1">
											{segment.secondExercise.exercise.name}
										</Typography>
										<Grid
											item
											container
											className={classes.exerciseToAddInputContainer}
										>
											<Typography variant="body1">{segment.sets}</Typography>
											<Typography variant="body1" className={classes.xSignList}>
												×
											</Typography>
											<Typography variant="body1">
												{segment.secondExercise.repRange}
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							) : (
								<Grid item container className={classes.exerciseToAddContainer}>
									<Typography variant="body1">
										{segment.exercise.name}
									</Typography>
									<Grid
										item
										container
										className={classes.exerciseToAddInputContainer}
									>
										<Typography variant="body1">{segment.sets}</Typography>
										<Typography variant="body1" className={classes.xSignList}>
											×
										</Typography>
										<Typography variant="body1">{segment.repRange}</Typography>
									</Grid>
								</Grid>
							)
						)}
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
			{isExerciseModalOpen && (
				<Modal
					open={isExerciseModalOpen}
					onClose={handleSetExerciseModal}
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
			{isSupersetModalOpen && (
				<Modal
					open={isSupersetModalOpen}
					onClose={handleSetSupersetModal}
					className={classes.modalContainer}
				>
					<Box>
						<Grid
							item
							container
							direction="column"
							className={classes.modalContentContainer}
						>
							<Grid item container>
								<Typography
									variant="h6"
									className={classes.supersetModalHeading}
								>
									Lägg till Superset
								</Typography>
								<StyledTextField
									placeholder="Sets"
									onChange={(event) => handleUpdateSuperset('sets', event)}
									tiny
								/>
							</Grid>
							<StyledTextField
								placeholder="Sök"
								icon={{ element: <SearchRounded />, position: 'start' }}
								onChange={handleSupersetChange}
								onBlur={handleBlur}
								value={searchValue}
							/>
							{supersetSearchResults.length > 0 && (
								<Box className={classes.supersetSearchResultsContainer}>
									{supersetSearchResults.map((exerciseInList) => (
										<Grid item container className={classes.searchResult}>
											<Grid item container>
												<Typography variant="body1">
													{exerciseInList.name}
												</Typography>
												{/* <Typography
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
												</Typography> */}
											</Grid>
											<IconButton
												className={classes.searchResultAddIconButton}
												onClick={() =>
													handleUpdateSuperset(
														'exercise',
														undefined,
														exerciseInList
													)
												}
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
							<Grid
								item
								container
								className={classes.supersetModalExerciseListItem}
							>
								<Typography
									variant="body1"
									className={classes.supersetListExerciseName}
								>
									{supersetToAdd.firstExercise.exercise.name ||
										'Ingen övning vald'}
								</Typography>
								<Grid item container className={classes.supersetListSetsXReps}>
									<Typography>{supersetToAdd.sets || '?'}</Typography>
									<Typography variant="body1" className={classes.xSignSuperset}>
										×
									</Typography>
									<StyledTextField
										placeholder="reps"
										onChange={(event) =>
											handleUpdateSuperset('firstExercise.repRange', event)
										}
										small
									/>
								</Grid>
							</Grid>
							<Grid
								item
								container
								className={classes.supersetModalExerciseListItem}
							>
								<Typography
									variant="body1"
									className={classes.supersetListExerciseName}
								>
									{supersetToAdd.secondExercise.exercise.name ||
										'Ingen övning vald'}
								</Typography>
								<Grid item container className={classes.supersetListSetsXReps}>
									<Typography>{supersetToAdd.sets || '?'}</Typography>
									<Typography variant="body1" className={classes.xSignSuperset}>
										×
									</Typography>
									<StyledTextField
										placeholder="reps"
										onChange={(event) =>
											handleUpdateSuperset('secondExercise.repRange', event)
										}
										small
									/>
								</Grid>
							</Grid>
							<Typography variant="body1" className={classes.modalErrorText}>
								{modalErrorMessage}
							</Typography>
							<Button
								variant="contained"
								color="primary"
								className={classes.addExerciseButton}
								onClick={handleAddSupersetToList}
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

/* <StyledTextField
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
)} */
