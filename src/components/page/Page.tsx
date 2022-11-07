import { ReactNode } from 'react';
import { Grid } from '@material-ui/core';

import useStyles from './styles';
import { SetPageTitle } from '../../utils';
import { motion } from 'framer-motion';

interface IPage {
  title: string;
  children: ReactNode;
}

export const Page = ({ children, title }: IPage) => {
  const classes = useStyles();
  SetPageTitle(title);
  return (
    <Grid
      item
      container
      direction="column"
      className={classes.root}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </Grid>
  );
};

export default Page;
