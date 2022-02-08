import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import { ChevronRightRounded } from '@material-ui/icons';
import { getDocs, collection, DocumentData } from '@firebase/firestore';

import useStyles from './styles';
import { HomeCard, HomeWorkoutCard, Page, TitleHeader } from '../../components';
import { getNumberOfSets, homePageCards } from '../../utils';
import { db } from '../../firebase-config';

export const HomePage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();
	const workoutsCollectionRef = collection(db, 'workouts');
	const [workoutsFromDB, setWorkoutsFromDB] = useState<DocumentData[]>([]);

	useEffect(() => {
		const getWorkouts = async () => {
			const data = await getDocs(workoutsCollectionRef);
			const unsortedWorkouts = data.docs.map((doc) => doc.data());
			const sortedWorkouts = unsortedWorkouts.sort((a, b) => {
				return a.createdAt - b.createdAt;
			});
			setWorkoutsFromDB(sortedWorkouts);
		};
		getWorkouts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const HeaderButton = () => (
		<Button
			endIcon={<ChevronRightRounded />}
			className={classes.headerButton}
			onClick={handleNavigate}
		>
			Se alla
		</Button>
	);

	const handleNavigate = () => {
		navigateTo('/all-workouts');
	};

	return (
		<Page title="Hem">
			<Grid item container direction="column">
				<TitleHeader title="Dina pass" button={<HeaderButton />} />
				<Grid item container className={classes.workoutCardContainer}>
					{workoutsFromDB.length > 0 ? (
						workoutsFromDB.map((workout) => (
							<HomeWorkoutCard
								name={workout.name}
								exercises={workout.exercises.length}
								sets={getNumberOfSets(workout)}
								key={workout.name}
							/>
						))
					) : (
						<Grid item container className={classes.spinnerContainer}>
							<CircularProgress className={classes.spinner} />
						</Grid>
					)}
				</Grid>
				<Grid item container className={classes.cardContainer}>
					{homePageCards.map((card) => (
						<HomeCard
							label={card.label}
							icon={card.icon}
							path={card.path}
							key={card.label}
						/>
					))}
				</Grid>
			</Grid>
		</Page>
	);
};

export default HomePage;
