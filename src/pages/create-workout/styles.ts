import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	headerButton: {
		paddingTop: 5,
		paddingBottom: 5,
		borderRadius: 30,
		fontSize: 13,
		alignSelf: 'center',
	},
	contentContainer: {
		marginTop: 30,
	},
	input: {
		backgroundImage: theme.palette.gradient.gradient,
		padding: '14px 10px',
		borderRadius: 10,
		border: 'none',
		outline: 'none',
		color: theme.palette.common.white,
		fontFamily: 'Outfit',
		fontSize: 15,
		marginBottom: 16,
	},
	label: {
		marginBottom: 2,
		marginLeft: 2,
	},
	marginTop: {
		marginTop: 16,
	},
	select: {
		borderRadius: 10,
		padding: '9px 10px',
		backgroundImage: theme.palette.gradient.gradient,
		color: theme.palette.common.white,
		'&.MuiInput-underline:after': {
			borderBottom: 'none',
		},
		'&.MuiInput-underline:before': {
			borderBottom: 'none',
			opacity: 0,
		},
		'& > svg': {
			color: theme.palette.common.white,
			marginRight: 5,
		},
	},
	selectMenu: {
		backgroundColor: '#474747',
		padding: 0,
		borderRadius: 10,
		maxHeight: 200,
		width: '100%',
		marginTop: 60,
	},
	menuItem: {
		color: theme.palette.common.white,
		paddingTop: 0,
		paddingBottom: 0,
		minHeight: 34,
		'&:first-of-type': {
			paddingTop: 8,
			paddingBottom: 4,
		},
		'&:last-of-type': {
			paddingTop: 4,
			paddingBottom: 8,
		},
	},
	selectIcon: {
		color: theme.palette.common.white,
	},
	chipContainer: {
		margin: '8px 0 0 0',
	},
	chip: {
		paddingTop: 4,
		paddingBottom: 4,
		marginRight: 6,
		height: 25,
		backgroundColor: theme.palette.secondary.light,
		color: theme.palette.common.white,
		'& > svg': {
			color: theme.palette.grey[600],
			width: 18,
			height: 18,
			marginRight: 4,
		},
	},
	exercisesHeader: {
		alignItems: 'center',
		justifyContent: 'space-between',
		margin: '30px 0 12px 0',
	},
	exercisesContainer: {
		position: 'relative',
	},
	searchResultsContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 54,
		zIndex: 10,
		height: 'fit-content',
		backgroundColor: theme.palette.secondary.light,
		borderRadius: 10,
		padding: 10,
		maxHeight: 150,
		overflowY: 'scroll',
	},
	searchResult: {
		flexWrap: 'nowrap',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	searchResultTargetMuscle: {
		color: theme.palette.grey[500],
		marginTop: 3,
	},
	searchResultSeparator: {
		marginRight: 5,
		marginLeft: 5,
		color: theme.palette.grey[500],
	},
	searchResultAddIconButton: {
		padding: 5,
	},
	searchResultIcon: {
		color: theme.palette.common.white,
	},
	exerciseListContainer: {
		marginTop: 10,
		position: 'relative',
	},
	exerciseListHeader: {
		marginBottom: 24,
	},
	exerciseListHeaderSets: {
		position: 'absolute',
		top: 0,
		right: 81,
	},
	exerciseListHeaderReps: {
		position: 'absolute',
		top: 0,
		right: 11,
	},
	confirmButton: {
		borderRadius: 20,
		position: 'fixed',
		zIndex: 20,
		bottom: 20,
		width: 'calc(100% - 32px)',
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
	addExerciseButton: {
		borderRadius: 20,
		marginTop: 20,
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
	exerciseToAddContainer: {
		padding: '5px 0',
		marginBottom: 2,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
	},
	exerciseToAddInputContainer: {
		width: 'fit-content',
	},
	xSign: {
		margin: '0 20px',
	},
	xSignSuperset: {
		margin: '0 13px',
	},
	xSignList: {
		margin: '0 10px',
	},
	disableOutline: {
		outline: 'none',
	},
	modalContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		outline: 'none',
		'&:focus': {
			outline: 'none',
		},
		'&.Mui-focused': {
			outline: 'none',
		},
	},
	modalContentContainer: {
		backgroundColor: theme.palette.secondary.dark,
		width: 'calc(100vw - 32px)',
		padding: 20,
		borderRadius: 10,
		boxShadow: '0px 0px 15px 2px #101010',
		position: 'relative',
	},
	modalTextFieldContainer: {
		flex: 1,
		flexWrap: 'nowrap',
		alignItems: 'center',
		marginTop: 16,
	},
	modalExerciseName: {
		marginBottom: 5,
	},
	modalErrorText: {
		color: theme.palette.error.main,
		marginTop: 10,
	},
	supersetSearchResultsContainer: {
		position: 'absolute',
		left: 20,
		right: 20,
		top: 130,
		zIndex: 10,
		height: 'fit-content',
		backgroundColor: theme.palette.secondary.light,
		borderRadius: 10,
		padding: 10,
		maxHeight: 150,
		overflowY: 'scroll',
	},
	supersetModalExerciseListItem: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: 'nowrap',
		marginTop: 10,
	},
	supersetListExerciseName: {
		width: 'fit-content',
	},
	supersetListSetsXReps: {
		width: 'fit-content',
		alignItems: 'center',
		// marginLeft: 'auto',
	},
	supersetModalHeader: {
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	supersetModalHeading: {
		marginBottom: 20,
		marginRight: 'auto',
	},
	supersetInListContainer: {
		border: '1px solid' + theme.palette.secondary.main,
		borderRadius: 8,
		padding: '5px 10px',
		marginBottom: 6,
	},
}));
