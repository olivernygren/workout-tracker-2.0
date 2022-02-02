import { useEffect, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../../firebase-config';
import useStyles from './styles';
import { Page, Spinner, TitleHeader, WorkoutCard } from '../../components';
import { workoutNameToPathConverter } from '../../utils';
import { getNumberOfSets } from '../../utils/getNumberOfSets';
import { Workout } from '../../types';

export const AllWorkoutsPage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();

	const workoutsCollectionRef = collection(db, 'workouts');
	const [workoutsFromDB, setWorkoutsFromDB] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

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
		setIsLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
				<Spinner />
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
						{workoutsFromDB.map((workout: Workout) => {
							return (
								<WorkoutCard
									name={workout.name}
									sets={getNumberOfSets(workout)}
									path={workoutNameToPathConverter(workout.name)}
									key={workout.createdAt!}
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
