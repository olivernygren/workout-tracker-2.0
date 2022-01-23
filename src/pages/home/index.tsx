import { Grid, Typography, Button } from '@material-ui/core';
import { ChevronRightRounded } from '@material-ui/icons';

import useStyles from './styles';
import { Page, Title } from '../../components';

export const HomePage = () => {
	const classes = useStyles();

	return (
		<Page title="Hem">
			<Grid item container direction="column">
				<Grid item container className={classes.titleHeader}>
					<Title title="Dina pass" />
					<Button
						endIcon={<ChevronRightRounded />}
						className={classes.headerButton}
					>
						Se alla
					</Button>
				</Grid>
				{/* <Typography variant="h1">Skapa pass</Typography>
				<Typography variant="h2">Skapa pass</Typography>
				<Typography variant="h3">Skapa pass</Typography>
				<Typography variant="h4">Skapa pass</Typography>
				<Typography variant="h5">Skapa pass</Typography>
				<Typography variant="h6">Skapa pass</Typography>
				<Typography variant="subtitle1">Skapa pass</Typography>
				<Typography variant="subtitle2">Skapa pass</Typography>
				<Typography variant="body1">Skapa pass</Typography>
				<Typography variant="body2">Skapa pass</Typography> */}
			</Grid>
		</Page>
	);
};

export default HomePage;
