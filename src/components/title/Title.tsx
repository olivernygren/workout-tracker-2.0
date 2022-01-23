import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { NavigateBackButton } from '../navigateBackButton';

import useStyles from './styles';

interface ITitle {
	title: string;
	navigateBackButton?: boolean;
	navigateTo?: string;
}

export const Title = ({ title, navigateBackButton, navigateTo }: ITitle) => {
	const classes = useStyles();
	return (
		<Grid item container className={classes.titleContainer}>
			{navigateBackButton && <NavigateBackButton page={navigateTo!} />}
			<Typography variant="h3" className={classes.title}>
				{title}
			</Typography>
		</Grid>
	);
};

export default Title;
