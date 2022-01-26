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
import { Page, StyledTextField, TitleHeader } from '../../components';
import { exerciseDatabase, muscleGroups } from '../../utils';
import {
	AddRounded,
	ExpandMoreRounded,
	SearchRounded,
} from '@material-ui/icons';
import { useState } from 'react';
import { Exercise } from '../../types';

export const CreateWorkoutPage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();
	const [searchResults, setSearchResults] = useState<Exercise[]>([]);
	const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>(
		[]
	);

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

	const handleSelect = (event: any) => {
		setSelectedMuscleGroups((oldstate) => [...oldstate, event.target.value]);
	};

	const handleDelete = (muscleGroup: string) => {
		console.log('deteted ' + muscleGroup);
		// hitta musclegroup i selectedmusclegroups array med .find och ta bort
	};

	// onBlur setSearchResults([])
	console.log(selectedMuscleGroups);

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
							onChange={handleSelect}
							// value={selectedMuscleGroups}
							// multiple
							// renderValue={(selected: any) => selected.join(', ')}
							IconComponent={() => <ExpandMoreRounded />}
							MenuProps={{
								classes: { paper: classes.selectMenu },
							}}
						>
							{muscleGroups.map((muscleGroup) => (
								<MenuItem value={muscleGroup} className={classes.menuItem}>
									{muscleGroup}
									{/* <Checkbox /> */}
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
									<IconButton className={classes.searchResultAddIconButton}>
										<AddRounded
											className={classes.searchResultIcon}
											fontSize="small"
										/>
									</IconButton>
								</Grid>
							))}
						</Box>
					)}
				</Grid>
			</Grid>
		</Page>
	);
};

export default CreateWorkoutPage;
