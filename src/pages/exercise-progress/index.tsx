import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Grid,
	IconButton,
	Modal,
	Typography,
} from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import {
	collection,
	DocumentData,
	doc,
	updateDoc,
	onSnapshot,
	where,
	query,
} from '@firebase/firestore';

import useStyles from './styles';
import {
	Page,
	ProgressList,
	StyledTextField,
	TitleHeader,
} from '../../components';
import { addZero, pathToExerciseNameConverter } from '../../utils';
import { ProgressSegment, Exercise } from '../../types';
import { db } from '../../firebase-config';

export const ExerciseProgressPage = () => {
	const classes = useStyles();
	const { name } = useParams();
	const exerciseNameFromPath = pathToExerciseNameConverter(name!);
	const [id, setId] = useState<string>('');
	const [matchingExercise, setMatchingExercise] = useState<
		DocumentData | Exercise | undefined
	>({ name: '', progress: [], targetMuscles: [] });

	const exercisesCollectionRef = collection(db, 'exercises');

	useEffect(() => {
		const getMatchingExercise = async () => {
			const q = query(
				exercisesCollectionRef,
				where('name', '==', exerciseNameFromPath)
			);
			onSnapshot(q, (snapshot) => {
				snapshot.docs.forEach((d) => {
					setMatchingExercise(d.data());
					setId(d.id);
				});
			});
		};
		getMatchingExercise();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let sortedArray: ProgressSegment[] = [];

	// sort progress segments by date
	if (matchingExercise) {
		sortedArray = matchingExercise!.progress!.sort(
			(
				a: DocumentData | ProgressSegment,
				b: DocumentData | ProgressSegment
			) => {
				return parseInt(b.date!) - parseInt(a.date!);
			}
		);
	}

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalErrorMessage] = useState('');
	const [weight, setWeight] = useState(0);
	const [reps, setReps] = useState(0);
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
		setWeight(parseInt(event.target.value));
	};

	const handleUpdateRepsValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setReps(parseInt(event.target.value));
	};

	const handleAddProgress = async () => {
		const dateExists: ProgressSegment = matchingExercise!.progress!.find(
			(obj: ProgressSegment) => obj.date === date
		);

		if (dateExists) {
			// console.log(dateExists.date + ' finns redan, lägger till ny instance');
			const docRef = doc(db, 'exercises', id);
			const updatedInstance = {
				...dateExists!,
				progressInstances: [
					...dateExists.progressInstances,
					{
						reps: reps,
						weight: weight,
					},
				],
			};
			matchingExercise!.progress!.splice(
				matchingExercise!.progress!.indexOf(dateExists),
				1,
				updatedInstance
			);
			await updateDoc(docRef, {
				progress: [...matchingExercise!.progress!],
			});
			setIsModalOpen(false);
		} else {
			// console.log('finns ej, lägger till nytt segment');
			const docRef = doc(db, 'exercises', id);
			await updateDoc(docRef, {
				progress: [
					...matchingExercise!.progress!,
					{
						date: date,
						notes: '',
						progressInstances: [{ reps: reps, weight: weight }],
					},
				],
			});
			setIsModalOpen(false);
			setDate(todaysDate);
		}
	};

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
				{matchingExercise ? (
					<ProgressList
						progressArray={sortedArray}
						// setShowNotesModal={handleSetNotesModal}
					/>
				) : (
					<Grid style={{ marginTop: 24 }}>
						<Typography>Ingen progress finns</Typography>
					</Grid>
				)}
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
