import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	headerButton: {
		paddingTop: 5,
		paddingBottom: 5,
		borderRadius: 30,
		fontSize: 13,
		alignSelf: 'center',
	},
	exercisesContainer: {
		marginTop: 24,
	},
	exerciseListTextHeader: {
		marginBottom: 10,
	},
	loadingContainer: {
		alignItems: 'center',
		width: 'fit-content',
	},
	loadingText: {
		marginRight: 10,
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
	searchBarContainer: {
		marginTop: 24,
		position: 'relative',
	},
}));
