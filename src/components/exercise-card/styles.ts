import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    backgroundImage: theme.palette.gradient.gradient,
    borderRadius: 12,
    marginBottom: 16,
    padding: '8px 13px',
    display: 'flex',
    alignItems: 'center',
  },
  progressButton: {
    // backgroundColor: theme.palette.grey[800],
    padding: 4,
    height: 'fit-content',
    borderRadius: 8,
    '&:hover': {
      borderRadius: 8,
      backgroundColor: theme.palette.grey[900],
    },
  },
  setsXrepsContainer: {
    alignItems: 'center',
  },
  setsXreps: {
    color: theme.palette.grey[400],
  },
  icon: {
    color: theme.palette.primary.light,
    marginLeft: -3,
    marginRight: 6,
  },
  menuIcon: {
    color: theme.palette.common.white,
  },
  disabledIcon: {
    color: theme.palette.grey[500],
  },
  popover: {
    padding: '2px 14px',
    backgroundColor: theme.palette.grey[800],
    borderRadius: 10,
    width: 180,
  },
  popoverItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
  },
  disabled: {
    color: theme.palette.grey[500],
  },
}));
