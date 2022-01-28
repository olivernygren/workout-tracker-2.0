import { Grid, Button, Typography, IconButton, Box } from '@material-ui/core';
import { AddRounded, SearchRounded } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import {
	ExerciseProgressCard,
	Page,
	StyledTextField,
	TitleHeader,
} from '../../components';
import { exerciseDatabase } from '../../utils';
import { Exercise } from '../../types';
import { useState } from 'react';

export const ProgressPage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();

	const [searchResults, setSearchResults] = useState<Exercise[]>([]);
	const [searchValue, setSearchValue] = useState('');

	const HeaderButton = () => (
		<Button
			endIcon={<AddRounded />}
			className={classes.headerButton}
			color="primary"
			disableElevation
			variant="contained"
			onClick={handleNavigate}
		>
			Knapp
		</Button>
	);

	const handleNavigate = () => {
		navigateTo('/link');
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
		setSearchValue(event.target.value);
		searchFunction(event.target.value);
	};

	const handleBlur = () => {
		setTimeout(() => {
			setSearchResults([]);
		}, 50);
	};

	return (
		<Page title="Progress">
			<Grid item container direction="column">
				<TitleHeader
					title="Progress"
					navigateBackButton
					navigateTo="/"
					button={<HeaderButton />}
				/>
			</Grid>
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
								// onClick={() => handleSetActiveExercise(exercise)}
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
				direction="column"
				className={classes.exercisesContainer}
			>
				{exerciseDatabase.map((exercise) => (
					<ExerciseProgressCard exercise={exercise.name} />
				))}
			</Grid>
		</Page>
	);
};

export default ProgressPage;
