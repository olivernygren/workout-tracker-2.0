import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	container: {
		marginBottom: 14,
	},
	date: {
		// marginBottom: 8,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
	},
	progressCheckboxContainer: {
		width: 'fit-content',
		alignItems: 'center',
		'& > p': {
			color: theme.palette.grey[400],
		},
	},
	progressCheckbox: {
		color: theme.palette.grey[500],
	},
	notes: {
		marginBottom: 6,
		color: theme.palette.error.light,
	},
	set: {
		backgroundImage: theme.palette.gradient.gradient,
		borderRadius: 8,
		marginBottom: 8,
		padding: '7px 10px',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
	},
	weightXreps: {
		width: 'fit-content',
	},
	xSign: {
		margin: '0 10px',
	},
	notesButton: {
		// paddingTop: 5,
		// paddingBottom: 5,
		padding: '3px 12px',
		borderRadius: 30,
		fontSize: 13,
		alignSelf: 'center',
		backgroundColor: theme.palette.secondary.main,
		// backgroundColor: '#303030',
		// alignSelf: 'end'
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
		// backgroundColor: theme.palette.secondary.main,
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
		// width: 'fit-content',
		// flexWrap: 'nowrap',
		// alignItems: 'center',
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
}));
