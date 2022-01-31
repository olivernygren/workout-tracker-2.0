import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	headerButton: {
		padding: 5,
		borderRadius: 30,
		fontSize: 13,
		alignSelf: 'center',
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
		},
	},
	container: {
		marginTop: 30,
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
	xSign: {
		margin: '0 20px',
	},
	setsButtonContainer: {
		alignItems: 'center',
		marginTop: 12,
		// width: 'fit-content',
		// flex: 1,
	},
	// addSetsButton: {
	// 	backgroundColor: theme.palette.secondary.main,
	// 	color: theme.palette.common.white,
	// 	'&:hover': {
	// 		backgroundColor: theme.palette.secondary.main,
	// 	},
	// 	padding: '0.4em 1em',
	// 	borderRadius: 30,
	// 	fontSize: 13,
	// 	width: 'fit-content',
	// },
	// reduceSetsButton: {
	// 	padding: '7px',
	// 	marginLeft: 6,
	// 	backgroundColor: theme.palette.secondary.main,
	// 	height: 'fit-content',
	// 	color: theme.palette.common.white,
	// },
	setsIconButton: {
		color: theme.palette.common.white,
		backgroundColor: theme.palette.secondary.main,
		padding: 6,
		// borderRadius: 0,
		'&.MuiButtonGroup-groupedHorizontal:not(:last-child)': {
			borderTopLeftRadius: 10,
			borderBottomLeftRadius: 10,
		},
		'&.MuiButtonGroup-groupedHorizontal:not(:first-child)': {
			borderTopRightRadius: 10,
			borderBottomRightRadius: 10,
		},
	},
	buttonGroup: {
		marginLeft: 12,
	},
}));
