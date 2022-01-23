import { Grid, Typography } from '@material-ui/core';
import { Page } from '../../components';

export const HomePage = () => {
	return (
		<Page title="Hem">
			<Grid item container direction="column">
				<Typography variant="h1">Skapa pass</Typography>
				<Typography variant="h2">Skapa pass</Typography>
				<Typography variant="h3">Skapa pass</Typography>
				<Typography variant="h4">Skapa pass</Typography>
				<Typography variant="h5">Skapa pass</Typography>
				<Typography variant="h6">Skapa pass</Typography>
				<Typography variant="subtitle1">Skapa pass</Typography>
				<Typography variant="subtitle2">Skapa pass</Typography>
				<Typography variant="body1">Skapa pass</Typography>
				<Typography variant="body2">Skapa pass</Typography>
			</Grid>
		</Page>
	);
};

export default HomePage;
