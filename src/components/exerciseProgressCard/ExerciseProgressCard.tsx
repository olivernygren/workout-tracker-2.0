import { Box, IconButton, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import { exerciseNameToPathConverter, ProgressIcon } from '../../utils';
import useStyles from './styles';

interface IExerciseProgressCard {
	exercise: string;
}

export const ExerciseProgressCard = ({ exercise }: IExerciseProgressCard) => {
	const classes = useStyles();
	const navigateTo = useNavigate();

	const handleNavigate = () => {
		const exercisePath = exerciseNameToPathConverter(exercise);
		navigateTo(`/progress/${exercisePath}`);
	};

	return (
		<Box className={classes.container}>
			<Typography variant="subtitle1">{exercise}</Typography>
			<IconButton className={classes.progressButton} onClick={handleNavigate}>
				<ProgressIcon />
			</IconButton>
		</Box>
	);
};

export default ExerciseProgressCard;
