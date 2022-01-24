import { Grid, IconButton } from '@material-ui/core';

import { MenuIcon } from '../../utils';
import useStyles from './styles';

export const Header = () => {
	const classes = useStyles();

	return (
		<Grid container item component="header" className={classes.container}>
			<IconButton edge="start">
				<MenuIcon />
			</IconButton>
		</Grid>
	);
};

export default Header;
