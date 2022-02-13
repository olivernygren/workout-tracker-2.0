import { Box, Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { WeightRecord } from '../../types';
import { EvaluationIcon, formatDateShort } from '../../utils';

import useStyles from './styles';

interface IWeeklyBodyweight {
	weightLogs: WeightRecord[];
}

export const WeeklyBodyweight = ({ weightLogs }: IWeeklyBodyweight) => {
	const classes = useStyles();
	const [dateString, setDateString] = useState('');
	const [weightsArray, setWeightsArray] = useState<any[]>([]);

	useEffect(() => {
		const getDates = async () => {
			if (weightLogs !== undefined) {
				// IN REVERSE ORDER FOR BODYWEIGHT WEEKLY SUMMARY REVERSING
				const startDate = weightLogs[weightLogs.length - 1].date;
				const endDate = weightLogs[0].date;
				setDateString(
					`${formatDateShort(endDate)} - ${formatDateShort(startDate)}`
				);
				return;
			}
		};
		const getWeights = async () => {
			if (weightLogs !== undefined) {
				weightLogs.forEach((day) => {
					const withDot = day.weight.replaceAll(',', '.');
					const weightAsNumber = parseFloat(withDot);
					setWeightsArray((oldstate) => [...oldstate, weightAsNumber]);
				});
			}
		};
		getDates();
		getWeights();
	}, [weightLogs]);

	const getWeeklyAverage = () => {
		if (weightsArray.length) {
			const sum = weightsArray.reduce((a, b) => a + b, 0);
			const average = sum / weightsArray.length;
			const rounded = Math.round(average * 10) / 10;
			const withComma = rounded.toString().replaceAll('.', ',');
			return withComma;
		}
		return '';
	};

	return (
		<Box className={classes.container}>
			<Grid item container direction="column">
				<Grid item container className={classes.headingContainer}>
					<Typography variant="subtitle1">Veckans medelvikt</Typography>
					{/* <Chip label="-0,8 kg" className={classes.chip} /> */}
				</Grid>
				<Grid item container className={classes.datesContainer}>
					<EvaluationIcon className={classes.datesIcon} />
					<Typography variant="body2" className={classes.dates}>
						{dateString}
					</Typography>
				</Grid>
			</Grid>
			<Grid item container className={classes.weightNumberContainer}>
				<Typography variant="h3" className={classes.weight}>
					{getWeeklyAverage()}
				</Typography>
				<Typography variant="subtitle1" className={classes.weightUnit}>
					kg
				</Typography>
			</Grid>
		</Box>
	);
};

export default WeeklyBodyweight;
