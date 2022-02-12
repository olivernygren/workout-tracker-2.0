import { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Checkbox,
	Grid,
	Modal,
	Typography,
} from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import {
	collection,
	query,
	where,
	onSnapshot,
	// updateDoc,
	DocumentData,
	// doc,
	// arrayUnion,
	// deleteField,
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';

import { db } from '../../../firebase-config';
import { ProgressInstance, ProgressSegment } from '../../../types';
import { formatDate, pathToExerciseNameConverter } from '../../../utils';
import { StyledTextField } from '../../StyledTextField';
import useStyles from './styles';

interface IProgressSection {
	progressInstances: ProgressInstance[];
	date: string;
	notes: string;
	// setShowNotesModal: () => void;
}

export const ProgressSection = ({
	progressInstances,
	date,
	notes,
}: // setShowNotesModal,
IProgressSection) => {
	const classes = useStyles();
	const dateString = formatDate(date);
	const notesString = `* ${notes}`;
	const { name } = useParams();
	const exerciseNameFromPath = pathToExerciseNameConverter(name!);
	const exercisesCollectionRef = collection(db, 'exercises');

	const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
	// const [notesValue, setNotesValue] = useState('');
	// const [id, setId] = useState<string>('');
	// const [matchingExercise, setMatchingExercise] = useState<
	// 	DocumentData | Exercise | undefined
	// >({ name: '', progress: [], targetMuscles: [] });
	const [matchingProgressSegment] = useState<
		DocumentData | ProgressSegment | undefined
	>({ notes: '', progressInstances: [], date: '' });

	useEffect(() => {
		const getMatchingExercise = async () => {
			const q = query(
				exercisesCollectionRef,
				where('name', '==', exerciseNameFromPath)
			);
			onSnapshot(q, (snapshot) => {
				snapshot.docs.forEach((d) => {
					// setMatchingExercise(d.data());
					// setMatchingProgressSegment(d.data().progress);
					// setId(d.id);
				});
			});
		};
		getMatchingExercise();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// console.log(id);

	// const matchingProgressSegment = matchingExercise!.progress.find(
	// 	(segment: ProgressSegment) => date === segment.date
	// );
	// console.log(matchingProgressSegment);

	// const handleSetNotesModal = () => {
	// 	setIsNotesModalOpen(!isNotesModalOpen);
	// };

	// const handleUpdateNotesValue = (
	// 	event: React.ChangeEvent<HTMLInputElement>
	// 	// date: string
	// ) => {
	// 	setNotesValue(event.target.value);
	// };

	// console.log(matchingExercise?.progress);

	const handleAddNotes = async () => {
		try {
			// const docRef = doc(db, 'exercises', id);

			// prettier-ignore
			// await updateDoc(docRef, { "progress": [...matchingExercise!.progress!, { ...matchingProgressSegment, "notes": notesValue }] });
			// som det är nu: [...kopierar hela progress arrayen, {...lägger till nytt segment med samma data fast sätter notes till ett värde}]
			// hur det ska funka: [...kopierar hela progress arrayen, uppdatera: {...segment med samma data fast sätter notes till ett värde}]

			// await updateDoc(docRef, {
			// 	progress: deleteField()
			// });

			// await updateDoc(docRef, {
			// 	progress: arrayUnion({ ...matchingProgressSegment, notes: notesValue }),
			// });

			// await updateDoc(docRef, { "progress": [{ notes: 'hejhej'}] });
			// console.log(doc(db, 'exercises', id))
			setIsNotesModalOpen(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Box className={classes.container}>
				<Grid item container className={classes.date}>
					<Typography variant="h6">{dateString}</Typography>
					<Grid item container className={classes.progressCheckboxContainer}>
						<Typography variant="body2">Progress ?</Typography>
						<Checkbox color="primary" className={classes.progressCheckbox} />
					</Grid>
				</Grid>
				{notes.length > 0 && (
					<Typography variant="body2" className={classes.notes}>
						{notesString}
					</Typography>
				)}
				<Grid item container direction="column">
					{progressInstances.map((instance, index) => (
						<Grid item container className={classes.set}>
							<Typography variant="body1">Set {index + 1}</Typography>
							<Grid item container className={classes.weightXreps}>
								<Typography variant="body1">{instance.weight} kg</Typography>
								<Typography variant="body1" className={classes.xSign}>
									×
								</Typography>
								<Typography variant="body1">{instance.reps} reps</Typography>
							</Grid>
						</Grid>
					))}
				</Grid>
				<Button
					endIcon={<AddRounded fontSize="small" />}
					className={classes.notesButton}
					disableElevation
					variant="contained"
					// onClick={handleSetNotesModal}
				>
					Anteckningar
				</Button>
			</Box>
			{isNotesModalOpen && (
				<Modal
					open={isNotesModalOpen}
					// onClose={handleSetNotesModal}
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
								<Typography variant="h6">Lägg till anteckningar</Typography>
							</Grid>
							<StyledTextField
								placeholder="Anteckningar"
								multiline
								rows={4}
								defaultValue={matchingProgressSegment!.notes}
								// onChange={(event) => handleUpdateNotesValue(event)}
							/>
							{/* <Typography variant="body1" className={classes.modalErrorText}>
								{modalErrorMessage}
							</Typography> */}
							<Button
								variant="contained"
								color="primary"
								disableElevation
								disabled
								className={classes.addProgressButton}
								onClick={handleAddNotes}
							>
								Bekräfta
							</Button>
						</Grid>
					</Box>
				</Modal>
			)}
		</>
	);
};

export default ProgressSection;
