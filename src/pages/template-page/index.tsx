import { Grid, Button } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { Page, TitleHeader } from '../../components';

export const TemplatePage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();

	const HeaderButton = () => (
		<Button
			endIcon={<AddRounded />}
			className={classes.headerButton}
			color="primary"
			disableElevation
			variant="contained"
			onClick={handleNavigate}
		>
			Knapp
		</Button>
	);

	const handleNavigate = () => {
		navigateTo('/link');
	};

	return (
		<Page title="Titel">
			<Grid item container direction="column">
				<TitleHeader
					title="Titel"
					navigateBackButton
					navigateTo="back"
					button={<HeaderButton />}
				/>
			</Grid>
		</Page>
	);
};

export default TemplatePage;
