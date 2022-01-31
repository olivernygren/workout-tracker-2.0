import { Box, Button, Checkbox, Grid, Typography } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import { ProgressInstance } from '../../../types';
import { formatDate } from '../../../utils';

import useStyles from './styles';

interface IProgressSection {
	progressInstances: ProgressInstance[];
	date: string;
	notes: string;
}

export const ProgressSection = ({
	progressInstances,
	date,
	notes,
}: IProgressSection) => {
	const classes = useStyles();
	const dateString = formatDate(date);
	const notesString = `* ${notes}`;

	return (
		<Box className={classes.container}>
			<Grid item container className={classes.date}>
				<Typography variant="h6">{dateString}</Typography>
				<Grid item container className={classes.progressCheckboxContainer}>
					<Typography variant="body2">Progress ?</Typography>
					<Checkbox color="primary" className={classes.progressCheckbox} />
				</Grid>
			</Grid>
			{notes.length > 0 && (
				<Typography variant="body2" className={classes.notes}>
					{notesString}
				</Typography>
			)}
			<Grid item container direction="column">
				{progressInstances.map((instance, index) => (
					<Grid item container className={classes.set}>
						<Typography variant="body1">Set {index + 1}</Typography>
						<Grid item container className={classes.weightXreps}>
							<Typography variant="body1">{instance.weight} kg</Typography>
							<Typography variant="body1" className={classes.xSign}>
								×
							</Typography>
							<Typography variant="body1">{instance.reps} reps</Typography>
						</Grid>
					</Grid>
				))}
			</Grid>
			<Button
				endIcon={<AddRounded fontSize="small" />}
				className={classes.notesButton}
				disableElevation
				variant="contained"
				// onClick={handleNavigate}
			>
				Anteckningar
			</Button>
		</Box>
	);
};

export default ProgressSection;
