import { Grid } from '@material-ui/core';
import React from 'react';
import { Title } from '../title';

import useStyles from './styles';

interface ITitleHeader {
	title: string;
	navigateBackButton?: boolean;
	navigateTo?: string;
	button?: JSX.Element;
}

export const TitleHeader = ({
	title,
	navigateBackButton,
	navigateTo,
	button,
}: ITitleHeader) => {
	const classes = useStyles();
	return (
		<Grid item container className={classes.titleHeader}>
			<Title
				title={title}
				navigateBackButton={navigateBackButton}
				navigateTo={navigateTo}
			/>
			{button}
		</Grid>
	);
};

export default TitleHeader;
