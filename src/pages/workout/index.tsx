import { useEffect, useState } from 'react';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import { DeleteRounded } from '@material-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, DocumentData, getDocs, doc } from '@firebase/firestore';
import { deleteDoc } from 'firebase/firestore';

import useStyles from './styles';
import {
  ExerciseCard,
  Page,
  SupersetCard,
  TitleHeader,
} from '../../components';
import { pathToWorkoutNameConverter } from '../../utils';
import { db } from '../../firebase-config';
import { Workout } from '../../types';

export const WorkoutPage = () => {
  const classes = useStyles();
  const navigateTo = useNavigate();
  const { name } = useParams();
  const workoutNameFromPath = pathToWorkoutNameConverter(name!);

  const workoutsCollectionRef = collection(db, 'workouts');
  const [workout, setWorkout] = useState<DocumentData>({
    name: '',
    exercises: [],
    targetMuscles: [],
    path: '',
    createdAt: '',
  });
  const [docID, setDocID] = useState<string>('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const getWorkouts = async () => {
      const data = await getDocs(workoutsCollectionRef);
      const workouts = data.docs.map((doc) => ({
        ...(doc.data() as Workout),
        id: doc.id,
      }));
      const matchingWorkout = workouts.find(
        (workout) =>
          workout.name.toLowerCase() === workoutNameFromPath.toLowerCase()
      );
      setDocID(matchingWorkout!.id);
      setWorkout(matchingWorkout!);
    };
    getWorkouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const HeaderButton = () => (
    <Button
      endIcon={!deleteLoading && <DeleteRounded fontSize="small" />}
      className={classes.headerButton}
      disableElevation
      color="secondary"
      variant="contained"
      onClick={handleDeleteWorkout}
    >
      {deleteLoading ? <CircularProgress size={20} /> : 'Ta bort'}
    </Button>
  );

  const handleDeleteWorkout = async () => {
    setDeleteLoading(true);
    const docRef = doc(db, 'workouts', docID);
    await deleteDoc(docRef);
    setDeleteLoading(false);
    navigateTo('/all-workouts');
  };

  const ExerciseList = () => {
    const exerciseArray = workout!.exercises.map((segment: any) =>
      segment.firstExercise ? (
        <SupersetCard
          firstExercise={segment.firstExercise}
          secondExercise={segment.secondExercise}
          sets={segment.sets}
        />
      ) : (
        <ExerciseCard
          exercise={segment.exercise.name}
          sets={segment.sets!}
          repRange={segment.repRange}
          key={segment.exercise.name}
        />
      )
    );
    return exerciseArray;
  };

  return (
    <Page title={workoutNameFromPath}>
      <Grid item container direction="column">
        <TitleHeader
          title={workoutNameFromPath}
          titleSize="small"
          navigateBackButton
          navigateTo="back"
          button={<HeaderButton />}
        />
      </Grid>
      <Grid item container direction="column" className={classes.cardContainer}>
        {workout.exercises.length === 0 ? (
          <Grid item container className={classes.spinnerContainer}>
            <CircularProgress className={classes.spinner} />
          </Grid>
        ) : (
          <ExerciseList />
        )}
      </Grid>
    </Page>
  );
};

export default WorkoutPage;
