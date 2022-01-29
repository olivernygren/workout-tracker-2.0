import {
	Grid,
	Button,
	IconButton,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';

import useStyles from './styles';
import { Page, ProgressSection, TitleHeader } from '../../components';
import { useParams } from 'react-router-dom';
import { exerciseDatabase, pathToExerciseNameConverter } from '../../utils';
import { Exercise, ProgressInstance } from '../../types';
import { useState } from 'react';

export const ExerciseProgressPage = () => {
	const classes = useStyles();
	const { name } = useParams();
	const exerciseNameFromPath = pathToExerciseNameConverter(name!);
	const tabTitle = `Progress | ${exerciseNameFromPath}`;
	const defaultExercise: Exercise = {
		name: '',
		targetMuscles: [],
		progress: [],
	};
	const [exercise, setExercise] = useState(defaultExercise);
	let progressInstances: ProgressInstance[] = [];
	let progressDate: string = '';
	// const isExerciseLoaded: boolean = exercise !== defaultExercise;

	const matchedExercise = exerciseDatabase.find(
		(e) => e.name === exerciseNameFromPath
	);

	const HeaderButton = () => (
		<IconButton
			className={classes.headerButton}
			// color="primary"
			// onClick={handleNavigate}
		>
			<AddRounded />
		</IconButton>
	);

	if (matchedExercise) {
		matchedExercise!.progress!.forEach((segment) => {
			console.log(segment.progressInstances);
			progressInstances = segment.progressInstances;
			return progressInstances;
		});
	}

	if (matchedExercise) {
		matchedExercise!.progress!.forEach((segment) => {
			progressDate = segment.date!;
		});
	}

	// const Exercises = () => {
	// 	const exerciseProgressList = exercise.progress!.map((p) => (
	// <Grid item>
	// 	<Typography>{p.date}</Typography>
	// 	<Typography>{p.setIndex}</Typography>
	// 	<Typography>{p.weight}</Typography>
	// 	<Typography>{p.reps}</Typography>
	// </Grid>
	// 	));
	// 	return exercise.progress!.length > 0 ? (
	// 		exerciseProgressList
	// 	) : (
	// 		<Typography>Inga progress finns</Typography>
	// 	);
	// };

	//	för att mappa ut:
	// checka progress array => för alla som har samma date => rendera ut ett ProgressSection med Grid med titel (date) och kort för varje set med set, vikt, reps

	return (
		<Page title={tabTitle}>
			<Grid item container direction="column">
				<TitleHeader
					title={exerciseNameFromPath}
					titleSize="small"
					navigateBackButton
					navigateTo="back"
					button={<HeaderButton />}
				/>
				<Grid item container direction="column" className={classes.container}>
					{matchedExercise && matchedExercise.progress!.length > 0 ? (
						matchedExercise?.progress?.map((p) => (
							<ProgressSection
								progressInstances={progressInstances}
								date={p.date!}
								key={p.date!}
							/>
						))
					) : (
						<Typography>Ingen progress finns</Typography>
					)}
				</Grid>
			</Grid>
		</Page>
	);
};

export default ExerciseProgressPage;
