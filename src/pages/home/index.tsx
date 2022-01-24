import { Grid, Button } from '@material-ui/core';
import { ChevronRightRounded } from '@material-ui/icons';

import useStyles from './styles';
import { HomeCard, HomeWorkoutCard, Page, TitleHeader } from '../../components';
import { homePageCards } from '../../utils';

export const HomePage = () => {
	const classes = useStyles();

	const HeaderButton = () => (
		<Button endIcon={<ChevronRightRounded />} className={classes.headerButton}>
			Se alla
		</Button>
	);

	return (
		<Page title="Hem">
			<Grid item container direction="column">
				<TitleHeader title="Dina pass" button={<HeaderButton />} />
				<Grid item container className={classes.workoutCardContainer}>
					<HomeWorkoutCard
						name="Chest &amp; Biceps 1"
						exercises={5}
						sets={20}
					/>
					<HomeWorkoutCard name="Legs 1" exercises={5} sets={20} />
					<HomeWorkoutCard
						name="Shoulders &amp; Triceps 1"
						exercises={5}
						sets={20}
					/>
					<HomeWorkoutCard name="Back 1" exercises={5} sets={20} />
				</Grid>
				<Grid item container className={classes.cardContainer}>
					{homePageCards.map((card) => (
						<HomeCard label={card.label} icon={card.icon} path={card.path} />
					))}
				</Grid>
			</Grid>
		</Page>
	);
};

export default HomePage;
