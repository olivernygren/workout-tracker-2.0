import { Grid, Button, Typography, Select, MenuItem } from '@material-ui/core';
import { collection, addDoc } from 'firebase/firestore';

import useStyles from './styles';
import { Page, StyledTextField, TitleHeader } from '../../components';
import { checklistCategories } from '../../utils';
import { useState } from 'react';
import { db } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';

export const AddChecklistItemPage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();
	const defaultItem = { label: '', category: '', checked: false };
	const collectionRef = collection(db, 'checklist');

	const [item, setItem] = useState(defaultItem);

	const handleSetLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
		setItem((oldstate) => ({
			...oldstate,
			label: event.target.value,
		}));
	};

	const handleSetCategory = (event: any) => {
		setItem((oldstate) => ({
			...oldstate,
			category: event.target.value,
		}));
	};

	const handleAddItem = async () => {
		await addDoc(collectionRef, item);
		setItem(defaultItem);
		navigateTo('/checklist');
	};

	return (
		<Page title="Lägg till checklist item">
			<Grid item container direction="column">
				<TitleHeader
					title="Lägg till To-Do"
					titleSize="small"
					navigateBackButton
					navigateTo="back"
				/>
			</Grid>
			<Grid
				item
				container
				direction="column"
				className={classes.titleContainer}
			>
				<Typography variant="body1" className={classes.label}>
					Titel
				</Typography>
				<StyledTextField onChange={(event) => handleSetLabel(event)} />
			</Grid>
			<Grid
				item
				container
				direction="column"
				className={classes.selectContainer}
			>
				<Typography variant="body1" className={classes.label}>
					Kategori
				</Typography>
				<Select
					id="demo-simple-select"
					className={classes.select}
					placeholder="Välj"
					onChange={(event) => handleSetCategory(event)}
					MenuProps={{
						classes: { paper: classes.selectMenu },
					}}
				>
					{checklistCategories.map((category) => (
						<MenuItem value={category} className={classes.menuItem}>
							{category}
						</MenuItem>
					))}
				</Select>
			</Grid>
			<Button
				variant="contained"
				color="primary"
				className={classes.addButton}
				onClick={handleAddItem}
			>
				Bekräfta
			</Button>
		</Page>
	);
};

export default AddChecklistItemPage;
