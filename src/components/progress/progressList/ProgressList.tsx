import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { ProgressSegment } from '../../../types';
import { ProgressSection } from '../progressSection';

import useStyles from './styles';

interface IProgressList {
	progressArray: ProgressSegment[];
	// setShowNotesModal: () => void;
}

export const ProgressList = ({
	progressArray,
}: // setShowNotesModal,
IProgressList) => {
	// console.log(progressArray);
	const classes = useStyles();
	return progressArray.length > 0 ? (
		<Grid item container direction="column" className={classes.section}>
			{progressArray.map((segment) => (
				<ProgressSection
					date={segment.date!}
					progressInstances={segment.progressInstances}
					notes={segment.notes || ''}
					// setShowNotesModal={setShowNotesModal}
					key={Math.random() * 10000}
				/>
			))}
		</Grid>
	) : (
		<Grid item container direction="column" className={classes.section}>
			<Typography>Ingen progress finns</Typography>
		</Grid>
	);
};

export default ProgressList;
