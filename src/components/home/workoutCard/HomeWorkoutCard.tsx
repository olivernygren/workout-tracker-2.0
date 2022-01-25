import { Box, Button, Typography } from '@material-ui/core';
import { ChevronRightRounded } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { workoutNameToPathConverter } from '../../../utils';

import useStyles from './styles';

interface IHomeWorkoutCard {
	name: string;
	exercises: number;
	sets: number;
}

export const HomeWorkoutCard = ({
	name,
	exercises,
	sets,
}: IHomeWorkoutCard) => {
	const classes = useStyles();
	const exercisesString = `${exercises} övningar`;
	const setsString = `${sets} set`;
	const navigateTo = useNavigate();

	const handleNavigate = () => {
		navigateTo(workoutNameToPathConverter(name));
	};

	return (
		<Box className={classes.container}>
			<Typography variant="h6" className={classes.workoutName}>
				{name}
			</Typography>
			<Typography variant="body2">{exercisesString}</Typography>
			<Typography variant="body2">{setsString}</Typography>
			<Button
				variant="contained"
				color="primary"
				className={classes.button}
				endIcon={<ChevronRightRounded />}
				onClick={handleNavigate}
			>
				Se pass
			</Button>
		</Box>
	);
};

export default HomeWorkoutCard;
