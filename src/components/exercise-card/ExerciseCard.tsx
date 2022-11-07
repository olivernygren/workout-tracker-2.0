import React, { useState } from 'react';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Popover,
  Typography,
} from '@material-ui/core';
import {
  DeleteRounded,
  EditRounded,
  MoreVert,
  ReplayRounded,
} from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

import { exerciseNameToPathConverter, ProgressIcon } from '../../utils';
import useStyles from './styles';

interface IExerciseCard {
  exercise: string;
  sets: number;
  repRange: string;
}

export const ExerciseCard = ({ exercise, sets, repRange }: IExerciseCard) => {
  const classes = useStyles();
  const navigateTo = useNavigate();
  const setsXReps = `${sets} × ${repRange}`;

  const [showMenu, setShowMenu] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setShowMenu(!showMenu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowMenu(false);
  };

  const handleNavigate = () => {
    navigateTo(`/progress/${exerciseNameToPathConverter(exercise)}`);
  };

  const ExerciseMenu = () => (
    <Popover
      open={showMenu}
      onClose={handleClose}
      anchorEl={anchorEl}
      PaperProps={{ className: classes.popover }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box className={classes.popoverItem} onClick={handleNavigate}>
        <Typography variant="body1">Progress</Typography>
        <ProgressIcon />
      </Box>
      <Divider />
      <Box className={classes.popoverItem}>
        <Typography variant="body1" className={classes.disabled}>
          Ändra
        </Typography>
        <EditRounded className={classes.disabledIcon} fontSize="small" />
      </Box>
      <Divider />
      <Box className={classes.popoverItem}>
        <Typography variant="body1" className={classes.disabled}>
          Ta bort
        </Typography>
        <DeleteRounded className={classes.disabledIcon} fontSize="small" />
      </Box>
    </Popover>
  );

  return (
    <Box className={classes.container}>
      <Grid item container direction="column">
        <Typography variant="subtitle1">{exercise}</Typography>
        <Grid item container className={classes.setsXrepsContainer}>
          <ReplayRounded className={classes.icon} fontSize="small" />
          <Typography variant="body1" className={classes.setsXreps}>
            {setsXReps}
          </Typography>
        </Grid>
      </Grid>
      <IconButton
        className={classes.progressButton}
        onClick={handleClick}
        disableRipple
      >
        {/* <ProgressIcon /> */}
        <MoreVert className={classes.menuIcon} />
      </IconButton>
      <ExerciseMenu />
    </Box>
  );
};

export default ExerciseCard;
