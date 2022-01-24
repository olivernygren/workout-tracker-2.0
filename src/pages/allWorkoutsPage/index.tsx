import { Grid, Button } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { Page, TitleHeader, WorkoutCard } from '../../components';

export const AllWorkoutsPage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();

	const HeaderButton = () => (
		<Button
			endIcon={<AddRounded />}
			className={classes.headerButton}
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
			<Grid item container direction="column">
				<TitleHeader
					title="Alla pass"
					navigateBackButton
					navigateTo="back"
					button={<HeaderButton />}
				/>
			</Grid>
			<Grid item container direction="column" className={classes.cardContainer}>
				<WorkoutCard />
				<WorkoutCard />
				<WorkoutCard />
				<WorkoutCard />
				<WorkoutCard />
				<WorkoutCard />
			</Grid>
		</Page>
	);
};

export default AllWorkoutsPage;