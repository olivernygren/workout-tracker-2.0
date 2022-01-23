import { Grid, IconButton } from '@material-ui/core';

import { Menu } from '../../utils';
import useStyles from './styles';

export const Header = () => {
	const classes = useStyles();

	return (
		<Grid container item component="header" className={classes.container}>
			<IconButton edge="start">
				<Menu />
			</IconButton>
		</Grid>
	);
};

export default Header;
