import {
	Grid,
	Typography,
	Select,
	MenuItem,
	FormControl,
	Button,
	Box,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { Page, StyledTextField, TitleHeader } from '../../components';
import { exerciseDatabase, muscleGroups } from '../../utils';
import { AddRounded, SearchRounded } from '@material-ui/icons';
import { useState } from 'react';
import { Exercise } from '../../types';

export const CreateWorkoutPage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();
	const [searchResults, setSearchResults] = useState<Exercise[]>([]);

	const handleNavigate = () => {
		navigateTo('/add-exercises');
	};

	const searchFunction = (text: string) => {
		const arr = exerciseDatabase;
		const searchArr = arr.filter((exercise: Exercise) => {
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
		searchFunction(event.target.value);
	};

	// onBlur setSearchResults([])

	return (
		<Page title="Skapa pass">
			<Grid item container direction="column">
				<TitleHeader title="Skapa pass" navigateBackButton navigateTo="back" />
			</Grid>
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
					<StyledTextField fullWidth />
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
						>
							{muscleGroups.map((muscleGroup) => (
								<MenuItem value={muscleGroup} className={classes.menuItem}>
									{muscleGroup}
								</MenuItem>
							))}
						</Select>
					</FormControl>
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
					/>
					{searchResults.length > 0 && (
						<Box className={classes.searchResultsContainer}>
							{searchResults.map((exercise) => (
								<Typography>{exercise.name}</Typography>
							))}
						</Box>
					)}
				</Grid>
			</Grid>
		</Page>
	);
};

export default CreateWorkoutPage;
