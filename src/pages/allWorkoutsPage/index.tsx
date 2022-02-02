import { useEffect, useState } from 'react';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc } from 'firebase/firestore';

import { db } from '../../firebase-config';
import useStyles from './styles';
import { Page, TitleHeader, WorkoutCard } from '../../components';
import { workoutNameToPathConverter, workouts } from '../../utils';
import { getNumberOfSets } from '../../utils/getNumberOfSets';
import { Workout } from '../../types';

export const AllWorkoutsPage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();

	const workoutsCollectionRef = collection(db, 'workouts');
	const [workoutsFromDB, setWorkoutsFromDB] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// setIsLoading(true);
		const getWorkouts = async () => {
			const data = await getDocs(workoutsCollectionRef);
			setWorkoutsFromDB(
				data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
				// data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		};
		getWorkouts();
		setIsLoading(false);
	}, []);

	const HeaderButton = () => (
		<Button
			endIcon={<AddRounded />}
			className={classes.headerButton}
			disableElevation
			color="primary"
			variant="contained"
			onClick={handleNavigate}
		>
			Skapa pass
		</Button>
	);

	const handleNavigate = () => {
		navigateTo('/create-workout');
	};

	return (
		<Page title="Alla Pass">
			{isLoading ? (
				<Grid
					item
					container
					style={{ alignItems: 'center', justifyContent: 'center' }}
				>
					<CircularProgress />
				</Grid>
			) : (
				<>
					<Grid
						item
						container
						direction="column"
						className={classes.titleHeaderContainer}
					>
						<TitleHeader
							title="Alla pass"
							navigateBackButton
							navigateTo="/"
							button={<HeaderButton />}
						/>
					</Grid>
					<Grid
						item
						container
						direction="column"
						className={classes.cardContainer}
					>
						{/* {workouts.map((workout) => (
					<WorkoutCard
						name={workout.name}
						sets={getNumberOfSets(workout)}
						path={workoutNameToPathConverter(workout.name)}
						key={workout.name}
					/>
				))} */}
						{workoutsFromDB.map((workout) => {
							return (
								<WorkoutCard
									name={workout.name}
									sets={getNumberOfSets(workout)}
									path={workoutNameToPathConverter(workout.name)}
									key={workout.id}
								/>
							);
						})}
					</Grid>
				</>
			)}
		</Page>
	);
};

export default AllWorkoutsPage;
