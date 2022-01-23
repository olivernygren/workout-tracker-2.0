import { IconButton } from '@material-ui/core';
import { ChevronLeftRounded } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';

interface INavigateBackButton {
	page: string;
}

export const NavigateBackButton = ({ page }: INavigateBackButton) => {
	const classes = useStyles();
	const navigateTo = useNavigate();

	const handleNavigateBack = () => {
		navigateTo(-1);
	};

	const handleNavigateToPage = () => {
		navigateTo(page);
	};

	const navigate = () => {
		page === 'back' ? handleNavigateBack() : handleNavigateToPage();
	};

	return (
		<IconButton edge="start" className={classes.button} onClick={navigate}>
			<ChevronLeftRounded className={classes.icon} />
		</IconButton>
	);
};

export default NavigateBackButton;
