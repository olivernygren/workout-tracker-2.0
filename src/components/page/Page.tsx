import { ReactNode } from 'react';
import { Grid } from '@material-ui/core';

import useStyles from './styles';
import { SetPageTitle } from '../../utils';

interface IPage {
	title: string;
	children: ReactNode;
}

export const Page = ({ children, title }: IPage) => {
	const classes = useStyles();
	SetPageTitle(title);
	return (
		<Grid container className={classes.root}>
			{children}
		</Grid>
	);
};

export default Page;
