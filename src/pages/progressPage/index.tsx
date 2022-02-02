import { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';
import { collection, DocumentData, getDocs } from '@firebase/firestore';

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

	const [searchResults, setSearchResults] = useState<
		Exercise[] | DocumentData[]
	>([]);
	const [searchValue, setSearchValue] = useState('');
	const [exercises, setExercises] = useState<DocumentData[]>([]);
	const exercisesCollectionRef = collection(db, 'exercises');

	useEffect(() => {
		// setIsLoading(true);
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
			// setExercises(exercisesFromDB);
		};
		getExercises();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// const HeaderButton = () => (
	// 	<Button
	// 		endIcon={<AddRounded />}
	// 		className={classes.headerButton}
	// 		color="primary"
	// 		disableElevation
	// 		variant="contained"
	// 		onClick={handleNavigate}
	// 	>
	// 		Knapp
	// 	</Button>
	// );

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
				<Typography
					variant="subtitle1"
					className={classes.exerciseListTextHeader}
				>
					Sökresultat:
				</Typography>
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
				<Typography
					variant="subtitle1"
					className={classes.exerciseListTextHeader}
				>
					Alla:
				</Typography>
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
					// button={<HeaderButton />}
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
