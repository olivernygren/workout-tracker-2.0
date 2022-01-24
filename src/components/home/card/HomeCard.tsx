import { Box, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';

interface IHomeCard {
	label: string;
	icon: JSX.Element;
	path: string;
}

export const HomeCard = ({ label, icon, path }: IHomeCard) => {
	const classes = useStyles();
	const navigateTo = useNavigate();

	const handleNavigate = () => {
		navigateTo(path);
	};

	return (
		<Box className={classes.container} onClick={handleNavigate}>
			<Typography variant="h6">{label}</Typography>
			{icon}
		</Box>
	);
};

export default HomeCard;
