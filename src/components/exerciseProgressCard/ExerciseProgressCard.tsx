import { Box, IconButton, Typography } from '@material-ui/core';
import { ProgressIcon } from '../../utils';

import useStyles from './styles';

interface IExerciseProgressCard {
	exercise: string;
}

export const ExerciseProgressCard = ({ exercise }: IExerciseProgressCard) => {
	const classes = useStyles();
	return (
		<Box className={classes.container}>
			<Typography variant="subtitle1">{exercise}</Typography>
			<IconButton className={classes.progressButton}>
				<ProgressIcon />
			</IconButton>
		</Box>
	);
};

export default ExerciseProgressCard;
