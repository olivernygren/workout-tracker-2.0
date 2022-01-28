import {
	Grid,
	Button,
	IconButton,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';

import useStyles from './styles';
import { Page, TitleHeader } from '../../components';
import { useParams } from 'react-router-dom';
import { exerciseDatabase, pathToExerciseNameConverter } from '../../utils';
import { Exercise } from '../../types';
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
				{/* {isExerciseLoaded ? (
					<Typography>Progress finns</Typography>
				) : (
					<CircularProgress />
				)} */}
				{matchedExercise && matchedExercise.progress!.length > 0 ? (
					matchedExercise!.progress!.map((p) => (
						<Grid item>
							<Typography>{p.date}</Typography>
							<Typography>{p.setIndex}</Typography>
							<Typography>{p.weight}</Typography>
							<Typography>{p.reps}</Typography>
						</Grid>
					))
				) : (
					<Typography>Finns inget</Typography>
				)}
			</Grid>
		</Page>
	);
};

export default ExerciseProgressPage;
