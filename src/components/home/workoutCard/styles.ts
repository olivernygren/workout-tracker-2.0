import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    backgroundImage: theme.palette.gradient.gradient,
    padding: '30px 12px 28px 12px',
    textAlign: 'center',
    // marginRight: 16,
    minWidth: 140,
    flex: 1,
    borderRadius: 14,
    position: 'relative',
    overflowY: 'visible',
  },
  workoutName: {
    marginBottom: 16,
    lineHeight: 1.2,
  },
  button: {
    borderRadius: 50,
    position: 'absolute',
    bottom: '-16px',
    left: '50%',
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
    height: 32,
  },
}));
