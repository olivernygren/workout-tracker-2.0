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
import { useEffect, useState } from 'react';

import useStyles from './styles';
import {
	Page,
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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalErrorMessage, setModalErrorMessage] = useState('');
	// const [numberOfSets, setNumberOfSets] = useState(defaultNumberOfSets);
	const [newProgressInstance, setNewProgressInstance] =
		useState<ProgressInstance>({ setIndex: 0, weight: 0, reps: 0 });
	const [newProgressSegment, setNewProgressSegment] = useState<ProgressSegment>(
		{ date: undefined, progressInstances: [], notes: '' }
	);
	const exerciseNameFromPath = pathToExerciseNameConverter(name!);
	let progressInstances: ProgressInstance[] = [];
	const tabTitle = `Progress | ${exerciseNameFromPath}`;

	const today = new Date();
	const todaysDate = `${today
		.getFullYear()
		.toString()
		.substring(2, 4)}${addZero(today.getMonth() + 1)}${addZero(
		today.getDate()
	)}`;
	const [date, setDate] = useState(todaysDate);

	const matchedExercise = exerciseDatabase.find(
		(e) => e.name === exerciseNameFromPath
	);

	const HeaderButton = () => (
		<IconButton
			className={classes.headerButton}
			color="primary"
			onClick={handleSetModal}
		>
			<AddRounded />
		</IconButton>
	);

	if (matchedExercise) {
		matchedExercise!.progress!.forEach((segment) => {
			progressInstances = segment.progressInstances;
			return progressInstances;
		});
	}

	const handleSetModal = () => {
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
		setNewProgressInstance((oldstate) => ({
			...oldstate,
			weight: parseInt(event.target.value),
		}));
	};

	// console.log(defaultProgressInstances);

	const handleUpdateRepsValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setNewProgressInstance((oldstate) => ({
			...oldstate,
			reps: parseInt(event.target.value),
		}));
	};

	const handleAddProgress = () => {
		// console.log(date);
		const dateExists = matchedExercise!.progress!.find(
			(obj) => obj.date === date
		);
		// console.log(dateExists);
		if (dateExists) {
			console.log(dateExists.date + ' finns redan, lägger till ny instance');
			// let items = ['JS', 'PHP', 'RUBY'];

			// let replacedItem = items.splice(items.indexOf('RUBY'), 1, 'PYTHON')

			// console.log(replacedItem) //['RUBY']
			// console.log(items) //['JS', 'PHP', 'PYTHON']
			const updatedInstance = {
				...dateExists!,
				progressInstances: [
					...dateExists.progressInstances,
					newProgressInstance,
				],
			};
			console.log(updatedInstance);
			matchedExercise!.progress!.splice(
				matchedExercise!.progress!.indexOf(dateExists),
				1,
				updatedInstance
			);
			console.log(matchedExercise?.progress);
		} else {
			console.log('finns ej, lägger till nytt segment');
			setNewProgressSegment({
				date: date,
				progressInstances: [
					...progressInstances,
					{
						setIndex: progressInstances.length + 1,
						reps: newProgressInstance.reps,
						weight: newProgressInstance.weight,
					},
				],
				notes: '',
			});
		}

		setIsModalOpen(false);
	};

	if (newProgressSegment.date) {
		// prevent duplicate
		// kolla om date redan finns, i så fall pusha endast newInstance till progressInstances[]
		// sätt rätt set index
		matchedExercise!.progress!.push(newProgressSegment);
		setNewProgressSegment({
			date: undefined,
			progressInstances: [],
			notes: '',
		});
	}

	// console.log(newProgressSegment);
	// console.log(matchedExercise!.progress!);

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
								notes={p.notes! || ''}
								key={p.date!}
							/>
						))
					) : (
						<Typography>Ingen progress finns</Typography>
					)}
				</Grid>
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
							<Typography variant="h6">Lägg till set</Typography>
							<StyledTextField
								placeholder="Datum"
								small
								defaultValue={todaysDate}
								onChange={(event) => handleUpdateDateValue(event)}
								// onChange={(event) => handleUpdateWeightValue(event)}
							/>
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
