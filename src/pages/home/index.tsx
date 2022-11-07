import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, CircularProgress, Typography } from '@material-ui/core';
import { ChevronRightRounded } from '@material-ui/icons';
import { getDocs, collection, DocumentData } from '@firebase/firestore';

import useStyles from './styles';
import { HomeCard, HomeWorkoutCard, Page, TitleHeader } from '../../components';
import { getNumberOfSets, homePageCards } from '../../utils';
import { db } from '../../firebase-config';

export const HomePage = () => {
  const classes = useStyles();
  const navigateTo = useNavigate();

  const [workoutsFromDB, setWorkoutsFromDB] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const workoutsCollectionRef = collection(db, 'workouts');

  useEffect(() => {
    setIsLoading(true);
    const getWorkouts = async () => {
      const data = await getDocs(workoutsCollectionRef);
      const unsortedWorkouts = data.docs.map((doc) => doc.data());
      const sortedWorkouts = unsortedWorkouts.sort((a, b) => {
        return a.createdAt - b.createdAt;
      });
      setWorkoutsFromDB(sortedWorkouts);
      setIsLoading(false);
    };
    getWorkouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const HeaderButton = () => (
    <Button
      endIcon={<ChevronRightRounded />}
      className={classes.headerButton}
      onClick={handleNavigate}
    >
      Se alla
    </Button>
  );

  const handleNavigate = () => {
    navigateTo('/all-workouts');
  };

  return (
    <Page title="Hem">
      <Grid item container direction="column">
        <TitleHeader
          title="Dina pass"
          button={isLoading ? <></> : <HeaderButton />}
        />
        <Grid item container className={classes.workoutCardContainer}>
          {workoutsFromDB.length ? (
            workoutsFromDB.map((workout) => (
              <HomeWorkoutCard
                name={workout.name}
                exercises={workout.exercises.length}
                sets={getNumberOfSets(workout)}
                key={workout.name}
              />
            ))
          ) : isLoading ? (
            <Grid item container className={classes.spinnerContainer}>
              <CircularProgress className={classes.spinner} />
            </Grid>
          ) : (
            <Typography variant="body1">Inga pass hittades</Typography>
          )}
        </Grid>
        <Grid item container className={classes.cardContainer}>
          {homePageCards.map((card) => (
            <HomeCard
              label={card.label}
              icon={card.icon}
              path={card.path}
              key={card.label}
            />
          ))}
        </Grid>
      </Grid>
    </Page>
  );
};

export default HomePage;
