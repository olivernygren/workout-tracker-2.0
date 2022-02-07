import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Grid, Button, Typography, Modal, Box } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import { collection, DocumentData, getDocs, addDoc } from 'firebase/firestore';

import useStyles from './styles';
import { Page, StyledTextField, TitleHeader } from '../../components';
import { WeightRecord } from '../../types';
import { db } from '../../firebase-config';
import {
	addZero,
	dotToCommaConverter,
	formatDate,
	ScaleIcon,
} from '../../utils';

export const BodyweightPage = () => {
	const classes = useStyles();
	// const navigateTo = useNavigate();
	const today = new Date();
	const todaysDate = `${today
		.getFullYear()
		.toString()
		.substring(2, 4)}${addZero(today.getMonth() + 1)}${addZero(
		today.getDate()
	)}`;
	const [date, setDate] = useState<string>(todaysDate);
	const [weightLogs, setWeightLogs] = useState<WeightRecord[] | DocumentData[]>(
		[]
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [weight, setWeight] = useState('');

	const collectionRef = collection(db, 'bodyweight');

	useEffect(() => {
		const getWeightLogs = async () => {
			const data = await getDocs(collectionRef);
			const unsortedWeightLogs = data.docs.map((doc) => doc.data());
			const sortedWeightLogs = unsortedWeightLogs.sort((a, b) => {
				return b.date - a.date;
			});
			setWeightLogs(sortedWeightLogs);
		};
		getWeightLogs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const HeaderButton = () => (
		<Button
			endIcon={<AddRounded />}
			className={classes.headerButton}
			color="primary"
			disableElevation
			variant="contained"
			onClick={handleSetModal}
		>
			Lägg till
		</Button>
	);

	const handleSetModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const handleUpdateWeightValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setWeight(event.target.value);
	};

	const handleUpdateDateValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setDate(event.target.value);
	};

	const handleAddWeight = async () => {
		await addDoc(collectionRef, {
			date: date,
			weight: weight,
		});
		setIsModalOpen(false);
		window.location.reload();
	};

	console.log(weight);

	return (
		<Page title="Kroppsvikt">
			<Grid item container direction="column">
				<TitleHeader
					title="Viktlogg"
					navigateBackButton
					navigateTo="/"
					button={<HeaderButton />}
				/>
			</Grid>
			<Grid item container direction="column" className={classes.container}>
				{weightLogs.length > 0 &&
					weightLogs.map((log) => (
						<Grid item container className={classes.listItem}>
							<Typography variant="subtitle1">
								{formatDate(log.date)}
							</Typography>
							<Grid item container className={classes.weightContainer}>
								<Typography variant="body1" className={classes.weight}>
									{dotToCommaConverter(log.weight) + ' kg'}
								</Typography>
								<ScaleIcon className={classes.icon} />
							</Grid>
						</Grid>
					))}
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
								<Typography variant="h6">Lägg till vikt</Typography>
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
							{/* <Grid item container className={classes.modalTextFieldContainer}> */}
							<StyledTextField
								placeholder="kg"
								onChange={(event) => handleUpdateWeightValue(event)}
							/>
							{/* </Grid> */}
							{/* <Typography variant="body1" className={classes.modalErrorText}>
								{modalErrorMessage}
							</Typography> */}
							<Button
								variant="contained"
								color="primary"
								disableElevation
								className={classes.addProgressButton}
								onClick={handleAddWeight}
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

export default BodyweightPage;
