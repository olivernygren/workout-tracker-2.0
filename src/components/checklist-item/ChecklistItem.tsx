import React, { useState } from 'react';
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
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

interface IChecklistItem {
	label: string;
	category: string;
	checked: boolean;
	id: string;
}

export const ChecklistItem = ({
	label,
	category,
	checked,
	id,
}: IChecklistItem) => {
	const classes = useStyles();
	const categoryColor = getChecklistCategoryColor(category);
	const categoryIcon = GetChecklistCategoryIcon(category);
	// const collectionRef = collection(db, 'checklist');
	const [isChecked, setIsChecked] = useState(checked);

	const handleDeleteItem = async () => {
		const docRef = doc(db, 'checklist', id);
		await deleteDoc(docRef);
		window.location.reload();
	};

	const handleCheck = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(event.target.checked);
		const docRef = doc(db, 'checklist', id);
		// prettier-ignore
		await updateDoc(docRef, {
			"checked": event.target.checked,
		});
	};

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
					// defaultChecked={checked}
					checked={isChecked}
					className={classes.checkbox}
					onChange={(event) => handleCheck(event)}
				/>
			</Grid>
			<IconButton className={classes.deleteButton} onClick={handleDeleteItem}>
				<CloseRounded fontSize="small" />
			</IconButton>
		</Box>
	);
};

export default ChecklistItem;
