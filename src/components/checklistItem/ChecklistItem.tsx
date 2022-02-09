import React from 'react';
import {
	Box,
	Checkbox,
	Chip,
	Grid,
	IconButton,
	Typography,
} from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';

import { GetChecklistCategoryIcon } from '../../utils';
import useStyles from './styles';
import { getChecklistCategoryColor } from '../../utils';

interface IChecklistItem {
	label: string;
	category: string;
	checked: boolean;
	// id: string;
}

export const ChecklistItem = ({ label, category, checked }: IChecklistItem) => {
	const classes = useStyles();
	const categoryColor = getChecklistCategoryColor(category);
	const categoryIcon = GetChecklistCategoryIcon(category);

	// const handleDeleteItem = () => {};

	return (
		<Box className={classes.container}>
			<Grid item container direction="column" className={classes.textContainer}>
				<Grid item container className={classes.textContainer}>
					<Typography variant="h6" className={classes.label}>
						{label}
					</Typography>
					{categoryIcon}
				</Grid>
				<Chip
					label={category}
					className={classes.chip}
					style={{ color: categoryColor }}
				/>
			</Grid>
			<Grid item container className={classes.checkboxContainer}>
				<Checkbox
					color="primary"
					defaultChecked={checked}
					className={classes.checkbox}
				/>
			</Grid>
			<IconButton className={classes.deleteButton}>
				<CloseRounded fontSize="small" />
			</IconButton>
		</Box>
	);
};

export default ChecklistItem;
