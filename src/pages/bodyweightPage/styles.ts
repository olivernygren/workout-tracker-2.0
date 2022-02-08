import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	headerButton: {
		paddingTop: 5,
		paddingBottom: 5,
		borderRadius: 30,
		fontSize: 13,
		alignSelf: 'center',
	},
	container: {
		marginTop: 30,
	},
	listItem: {
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: theme.palette.secondary.main,
		borderRadius: 8,
		padding: '8px 14px',
		marginBottom: 10,
	},
	weightContainer: {
		width: 'fit-content',
		alignItems: 'center',
	},
	weight: {
		marginRight: 10,
	},
	icon: {
		height: 22,
		width: 22,
	},
	modalContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalContentContainer: {
		backgroundColor: theme.palette.secondary.dark,
		width: 'calc(100vw - 32px)',
		padding: 20,
		borderRadius: 10,
		boxShadow: '0px 0px 15px 2px #101010',
	},
	modalHeader: {
		flexWrap: 'nowrap',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	modalHeaderDateContainer: {
		width: 'fit-content',
		flexWrap: 'nowrap',
		alignItems: 'center',
		'& > p': {
			marginRight: 8,
		},
	},
	modalCloseIcon: {
		color: theme.palette.common.white,
		padding: 6,
		'&:hover': {
			backgroundColor: theme.palette.secondary.main,
		},
	},
	modalSegmentContainer: {
		flexWrap: 'nowrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 6,
	},
	modalTextFieldContainer: {
		width: 'fit-content',
		flexWrap: 'nowrap',
		alignItems: 'center',
	},
	modalErrorText: {
		color: theme.palette.error.main,
		marginTop: 10,
	},
	addProgressButton: {
		borderRadius: 20,
		marginTop: 14,
		paddingTop: 8,
		paddingBottom: 8,
		'&.MuiButton-contained.Mui-disabled': {
			backgroundColor: theme.palette.grey[800],
			color: theme.palette.grey[600],
		},
		'&.MuiButton-contained.Mui-disabled > span': {
			color: theme.palette.grey[600],
		},
	},
	spinnerContainer: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	spinner: {
		margin: '0 auto',
	},
}));
