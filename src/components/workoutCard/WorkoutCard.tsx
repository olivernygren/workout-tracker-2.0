import { Box, Grid, Typography } from '@material-ui/core';
import { FitnessCenterRounded } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';

interface IWorkoutCard {
	name: string;
	sets: number;
	path: string;
}

export const WorkoutCard = ({ name, sets, path }: IWorkoutCard) => {
	const classes = useStyles();
	const navigateTo = useNavigate();

	const handleNavigate = () => {
		navigateTo(path);
	};

	return (
		<Box className={classes.container} onClick={handleNavigate}>
			<Grid item container className={classes.left}>
				<Box className={classes.iconContainer}>
					<FitnessCenterRounded fontSize="small" className={classes.icon} />
				</Box>
				<Typography variant="subtitle1">{name}</Typography>
			</Grid>
			<Grid item className={classes.sets}>
				<Typography variant="body2">{sets} set</Typography>
			</Grid>
		</Box>
	);
};

export default WorkoutCard;
