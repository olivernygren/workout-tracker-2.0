import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import { collection, DocumentData, getDocs, addDoc } from 'firebase/firestore';

import useStyles from './styles';
import { Page, TitleHeader } from '../../components';
import { WeightRecord } from '../../types';
import { db } from '../../firebase-config';
import { dotToCommaConverter, formatDate, ScaleIcon } from '../../utils';

export const BodyweightPage = () => {
	const classes = useStyles();
	// const navigateTo = useNavigate();
	const [weightLogs, setWeightLogs] = useState<WeightRecord[] | DocumentData[]>(
		[]
	);

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

	const pushObjToCollection = async () => {
		await addDoc(collectionRef, {
			date: '220207',
			weight: 95.2,
		});
	};

	// måste pusha ett objekt till bodyweight collection från appen

	const HeaderButton = () => (
		<Button
			endIcon={<AddRounded />}
			className={classes.headerButton}
			color="primary"
			disableElevation
			variant="contained"
			onClick={pushObjToCollection}
		>
			Lägg till
		</Button>
	);

	// const handleNavigate = () => {
	// 	navigateTo('/link');
	// };

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
		</Page>
	);
};

export default BodyweightPage;
