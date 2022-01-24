import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { NavigateBackButton } from '../navigateBackButton';

import useStyles from './styles';

interface ITitle {
	title: string;
	navigateBackButton?: boolean;
	navigateTo?: string;
	titleSize?: string;
}

export const Title = ({
	title,
	navigateBackButton,
	navigateTo,
	titleSize,
}: ITitle) => {
	const classes = useStyles();
	const getTitleSize = titleSize === 'small' ? 'h5' : 'h3';

	return (
		<Grid item container className={classes.titleContainer}>
			{navigateBackButton && <NavigateBackButton page={navigateTo!} />}
			<Typography variant={getTitleSize} className={classes.title}>
				{title}
			</Typography>
		</Grid>
	);
};

export default Title;
