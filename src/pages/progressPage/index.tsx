import { useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { AddRounded, SearchRounded } from '@material-ui/icons';
import { collection, DocumentData, getDocs } from '@firebase/firestore';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import {
	ExerciseProgressCard,
	Page,
	StyledTextField,
	TitleHeader,
} from '../../components';
import { Exercise } from '../../types';
import { db } from '../../firebase-config';

export const ProgressPage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();

	const [searchResults, setSearchResults] = useState<
		Exercise[] | DocumentData[]
	>([]);
	const [searchValue, setSearchValue] = useState('');
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

	const handleNavigate = () => {
		navigateTo('/db');
	};

	const HeaderButton = () => (
		<Button
			endIcon={<AddRounded />}
			className={classes.headerButton}
			color="secondary"
			disableElevation
			variant="contained"
			onClick={handleNavigate}
		>
			Ny övning
		</Button>
	);

	const searchFunction = (text: string) => {
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

	const SearchResultsComponent = () => {
		return (
			<Grid
				item
				container
				direction="column"
				className={classes.exercisesContainer}
			>
				{searchResults.length === 0 ? (
					<Grid item container className={classes.loadingContainer}>
						<Typography variant="subtitle1" className={classes.loadingText}>
							Laddar
						</Typography>
						<CircularProgress size={18} />
					</Grid>
				) : (
					<Typography
						variant="subtitle1"
						className={classes.exerciseListTextHeader}
					>
						Sökresultat:
					</Typography>
				)}
				{/* <Typography
					variant="subtitle1"
					className={classes.exerciseListTextHeader}
				>
					{searchResults.length === 0 ? 'Laddar...' : 'Sökresultat:'}
				</Typography> */}
				{searchResults.map((exercise) => (
					<ExerciseProgressCard exercise={exercise.name} key={exercise.name} />
				))}
			</Grid>
		);
	};

	const NoSearchResults = () => {
		return (
			<Grid
				item
				container
				direction="column"
				className={classes.exercisesContainer}
			>
				<Typography
					variant="subtitle1"
					className={classes.exerciseListTextHeader}
				>
					Inga sökresultat
				</Typography>
				{searchResults.map((exercise) => (
					<ExerciseProgressCard exercise={exercise.name} key={exercise.name} />
				))}
			</Grid>
		);
	};

	const ExerciseList = () => {
		return (
			<Grid
				item
				container
				direction="column"
				className={classes.exercisesContainer}
			>
				{exercises.length === 0 ? (
					<Grid item container className={classes.loadingContainer}>
						<Typography variant="subtitle1" className={classes.loadingText}>
							Laddar
						</Typography>
						<CircularProgress size={18} />
					</Grid>
				) : (
					<Typography
						variant="subtitle1"
						className={classes.exerciseListTextHeader}
					>
						Alla:
					</Typography>
				)}
				{/* <Typography
					variant="subtitle1"
					className={classes.exerciseListTextHeader}
				>
					{exercises.length === 0 ? 'Laddar...' : 'Alla:'}
				</Typography> */}
				{exercises.map((exercise) => (
					<ExerciseProgressCard exercise={exercise.name} key={exercise.name} />
				))}
			</Grid>
		);
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
			<Grid
				item
				container
				direction="column"
				className={classes.searchBarContainer}
			>
				<StyledTextField
					placeholder="Sök"
					icon={{ element: <SearchRounded />, position: 'start' }}
					onChange={handleChange}
					onBlur={handleBlur}
					value={searchValue}
				/>
				{searchResults.length > 0 ? (
					<SearchResultsComponent />
				) : searchResults.length === 0 && searchValue !== '' ? (
					<NoSearchResults />
				) : (
					<ExerciseList />
				)}
			</Grid>
		</Page>
	);
};

export default ProgressPage;
