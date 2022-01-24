import { Grid, Button } from '@material-ui/core';
import { AddRounded, EditRounded } from '@material-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';

import useStyles from './styles';
import { Page, TitleHeader } from '../../components';
import { pathToWorkoutNameConverter } from '../../utils';

export const WorkoutPage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();
	const { name } = useParams();
	const workoutName = pathToWorkoutNameConverter(name!);

	const HeaderButton = () => (
		<Button
			endIcon={<EditRounded fontSize="small" />}
			className={classes.headerButton}
			color="secondary"
			variant="contained"
			onClick={handleNavigate}
		>
			Ändra
		</Button>
	);

	const handleNavigate = () => {
		navigateTo('/link');
	};

	return (
		<Page title={workoutName}>
			<Grid item container direction="column">
				<TitleHeader
					title={workoutName}
					titleSize="small"
					navigateBackButton
					navigateTo="back"
					button={<HeaderButton />}
				/>
			</Grid>
		</Page>
	);
};

export default WorkoutPage;
