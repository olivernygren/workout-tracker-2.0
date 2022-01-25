import {
	Grid,
	Typography,
	TextField,
	Select,
	MenuItem,
	InputBase,
	InputLabel,
	FormControl,
	Button,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { Page, TitleHeader } from '../../components';
import { muscleGroupEnum, muscleGroups } from '../../utils';
import { AddRounded } from '@material-ui/icons';

export const CreateWorkoutPage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();

	const handleNavigate = () => {
		navigateTo('/link');
	};

	return (
		<Page title="Skapa pass">
			<Grid item container direction="column">
				<TitleHeader title="Skapa pass" navigateBackButton navigateTo="back" />
			</Grid>
			<Grid
				item
				container
				direction="column"
				className={classes.contentContainer}
			>
				<Typography variant="subtitle1" className={classes.label}>
					Namn
				</Typography>
				<input className={classes.input} />
				<Typography variant="subtitle1" className={classes.label}>
					Muskelgrupper
				</Typography>
				<FormControl fullWidth>
					<Select
						id="demo-simple-select"
						className={classes.select}
						placeholder="Välj"
					>
						{muscleGroups.map((muscleGroup) => (
							<MenuItem value={muscleGroup} className={classes.menuItem}>
								{muscleGroup}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Grid item container className={classes.exercisesHeader}>
					<Typography variant="h5" className={classes.label}>
						Övningar
					</Typography>
					<Button
						endIcon={<AddRounded />}
						className={classes.headerButton}
						disableElevation
						color="primary"
						variant="contained"
						// onClick={handleNavigate}
					>
						Lägg till
					</Button>
				</Grid>
			</Grid>
		</Page>
	);
};

export default CreateWorkoutPage;
