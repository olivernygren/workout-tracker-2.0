import {
	Box,
	Button,
	Grid,
	IconButton,
	Modal,
	Typography,
} from '@material-ui/core';
import { AddRounded, CloseRounded } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useStyles from './styles';
import {
	Page,
	ProgressList,
	ProgressSection,
	StyledTextField,
	TitleHeader,
} from '../../components';
import {
	addZero,
	exerciseDatabase,
	pathToExerciseNameConverter,
} from '../../utils';
import { ProgressInstance, ProgressSegment } from '../../types';

export const ExerciseProgressPage = () => {
	const classes = useStyles();
	const { name } = useParams();
	// const defaultNumberOfSets: number[] = [1, 2, 3];
	const exerciseNameFromPath = pathToExerciseNameConverter(name!);
	let progressInstances: ProgressInstance[] = [];
	const matchedExercise = exerciseDatabase.find(
		(e) => e.name === exerciseNameFromPath
	);
	if (matchedExercise) {
		matchedExercise!.progress!.forEach((segment) => {
			progressInstances = segment.progressInstances;
			return progressInstances;
		});
	}

	const newSetIndex = progressInstances.length + 1;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalErrorMessage, setModalErrorMessage] = useState('');
	// const [newProgressInstance, setNewProgressInstance] =
	// 	useState<ProgressInstance>({ setIndex: newSetIndex, weight: 0, reps: 0 });
	// const [newProgressSegment, setNewProgressSegment] = useState<ProgressSegment>(
	// 	{ date: undefined, progressInstances: [], notes: '' }
	// );
	const [weight, setWeight] = useState(0);
	const [reps, setReps] = useState(0);
	const [readyToAdd, setReadyToAdd] = useState(false);
	const tabTitle = `Progress | ${exerciseNameFromPath}`;

	const today = new Date();
	const todaysDate = `${today
		.getFullYear()
		.toString()
		.substring(2, 4)}${addZero(today.getMonth() + 1)}${addZero(
		today.getDate()
	)}`;
	const [date, setDate] = useState<string>(todaysDate);

	const HeaderButton = () => (
		<IconButton
			className={classes.headerButton}
			color="primary"
			onClick={handleSetModal}
		>
			<AddRounded />
		</IconButton>
	);

	const handleSetModal = () => {
		setDate(todaysDate);
		console.log(date);
		setIsModalOpen(!isModalOpen);
	};

	const handleUpdateDateValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setDate(event.target.value);
	};

	const handleUpdateWeightValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		// console.log('weight', event.target.value);
		// setNewProgressInstance((oldstate) => ({
		// 	...oldstate,
		// 	weight: parseInt(event.target.value),
		// }));
		setWeight(parseInt(event.target.value));
	};

	// console.log(defaultProgressInstances);

	const handleUpdateRepsValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		// console.log('reps', event.target.value);
		// setNewProgressInstance((oldstate) => ({
		// 	...oldstate,
		// 	reps: parseInt(event.target.value),
		// }));
		setReps(parseInt(event.target.value));
	};

	const handleAddProgress = () => {
		setReadyToAdd(true);

		const dateExists = matchedExercise!.progress!.find(
			(obj) => obj.date === date
		);
		if (dateExists) {
			console.log(dateExists.date + ' finns redan, lägger till ny instance');
			const updatedInstance = {
				...dateExists!,
				progressInstances: [
					...dateExists.progressInstances,
					{
						setIndex: newSetIndex,
						reps: reps,
						weight: weight,
					},
				],
			};
			// console.log(updatedInstance);
			matchedExercise!.progress!.splice(
				matchedExercise!.progress!.indexOf(dateExists),
				1,
				updatedInstance
			);
			setReadyToAdd(false);
			// console.log(matchedExercise?.progress);
		} else {
			console.log('finns ej, lägger till nytt segment');
			// setNewProgressSegment({
			// 	date: date,
			// 	progressInstances: [
			// 		// ...progressInstances,
			// 		{
			// 			setIndex: newSetIndex,
			// 			reps: reps,
			// 			weight: weight,
			// 		},
			// 	],
			// 	notes: '',
			// });
		}

		setIsModalOpen(false);
	};

	if (readyToAdd) {
		console.log('triggar if sats');
		// validation på modal textfields
		// spara progress värdet, kopplat till datum
		// "lägg till notes"-knapp (skicka ett setNotes state till ProgressList -> ProgressSection)
		// "lägg till notes"-modal med defaultValue av redan existerande notes
		const dateExists = matchedExercise!.progress!.find(
			(obj) => obj.date === date
		);
		if (!dateExists) {
			matchedExercise!.progress!.unshift({
				date: date,
				progressInstances: [
					// ...progressInstances,
					{
						reps: reps,
						weight: weight,
					},
				],
				notes: '',
			});
			// setNewProgressInstance({ setIndex: newSetIndex, weight: 0, reps: 0 });
			setDate(todaysDate);
			setReadyToAdd(false);
		}
		setReadyToAdd(false);
		// setNewProgressSegment({
		// 	date: undefined,
		// 	progressInstances: [],
		// 	notes: '',
		// });
	}

	const sortedArray = matchedExercise!.progress!.sort((a, b) => {
		return parseInt(b.date!) - parseInt(a.date!);
	});

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
				<ProgressList progressArray={sortedArray} />
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
							<Grid item container className={classes.modalHeader}>
								<Typography variant="h6">Lägg till set</Typography>
								<Grid
									item
									container
									className={classes.modalHeaderDateContainer}
								>
									<Typography variant="body2">Datum: </Typography>
									<StyledTextField
										placeholder="Datum"
										small
										defaultValue={todaysDate}
										onChange={(event) => handleUpdateDateValue(event)}
									/>
									{/* <IconButton
										onClick={() => setIsModalOpen(false)}
										className={classes.modalCloseIcon}
									>
										<CloseRounded />
									</IconButton> */}
								</Grid>
							</Grid>
							<Grid item container className={classes.modalTextFieldContainer}>
								<StyledTextField
									placeholder="kg"
									onChange={(event) => handleUpdateWeightValue(event)}
								/>
								<Typography variant="body1" className={classes.xSign}>
									×
								</Typography>
								<StyledTextField
									placeholder="reps"
									onChange={(event) => handleUpdateRepsValue(event)}
								/>
							</Grid>
							<Typography variant="body1" className={classes.modalErrorText}>
								{modalErrorMessage}
							</Typography>
							<Button
								variant="contained"
								color="primary"
								disableElevation
								className={classes.addProgressButton}
								onClick={handleAddProgress}
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

export default ExerciseProgressPage;
