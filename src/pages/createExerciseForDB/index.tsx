import {
	Grid,
	Button,
	FormControl,
	Select,
	MenuItem,
	Typography,
	Chip,
} from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';

import useStyles from './styles';
import { Page, StyledTextField, TitleHeader } from '../../components';
import React, { useEffect, useState } from 'react';
import { addDoc, collection, getDocs } from '@firebase/firestore';
import { db } from '../../firebase-config';
import { muscleGroups } from '../../utils';

export const CreateExercisePage = () => {
	const classes = useStyles();
	const [error, setError] = useState('');
	const [name, setName] = useState('');
	const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>(
		[]
	);
	const [exercises, setExercises] = useState<string[]>([]);
	const exercisesCollectionRef = collection(db, 'exercises');

	useEffect(() => {
		// setIsLoading(true);
		const getExercises = async () => {
			const data = await getDocs(exercisesCollectionRef);
			const exercisesFromDB = data.docs.map((doc) => doc.data());
			// const sortedWorkouts = workouts.sort((a, b) => {
			// 	return a.createdAt - b.createdAt;
			// });
			exercisesFromDB.forEach((exercise) => {
				setExercises((oldstate) => [...oldstate, exercise.name]);
			});
		};
		getExercises();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const HeaderButton = () => (
		<Button
			endIcon={<AddRounded />}
			className={classes.headerButton}
			color="primary"
			disableElevation
			variant="contained"
		>
			Knapp
		</Button>
	);

	const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
		const splitArray: string[] = event.target.value.toLowerCase().split(' ');
		splitArray.forEach((word, i) => {
			splitArray[i] =
				splitArray[i].charAt(0).toUpperCase() + splitArray[i].slice(1);
		});
		const word = splitArray.join(' ');
		setName(word);
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

	const handleAddExerciseToDB = async () => {
		if (!exercises.includes(name) && selectedMuscleGroups.length > 0) {
			await addDoc(exercisesCollectionRef, {
				name: name,
				targetMuscles: selectedMuscleGroups,
				progress: [],
			});
			setSelectedMuscleGroups([]);
			setName('');
			window.location.reload();
		} else {
			setError('Övning finns redan eller tom targetMuscles');
			return;
		}
	};

	return (
		<Page title="Titel">
			<Grid item container direction="column">
				<TitleHeader
					title="Titel"
					navigateBackButton
					navigateTo="back"
					button={<HeaderButton />}
				/>
			</Grid>
			<Grid item container direction="column">
				<Grid item>
					<Typography variant="subtitle1">Namn</Typography>
					<StyledTextField
						fullWidth
						onChange={(event) => handleSetName(event)}
					/>
				</Grid>
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
				<Button
					variant="contained"
					color="primary"
					onClick={handleAddExerciseToDB}
					style={{ marginTop: 20 }}
				>
					Lägg till övning
				</Button>
				<Typography variant="body2" color="error">
					{error}
				</Typography>
			</Grid>
		</Page>
	);
};

export default CreateExercisePage;
