import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Grid, IconButton } from '@material-ui/core';
import { AddRounded, ReplayRounded } from '@material-ui/icons';
import { collection, DocumentData, getDocs } from 'firebase/firestore';

import useStyles from './styles';
import { ChecklistItem, Page, TitleHeader } from '../../components';
import { db } from '../../firebase-config';
import { ChecklistItemRecord } from '../../types';

export const ChecklistPage = () => {
	const classes = useStyles();
	const navigateTo = useNavigate();
	const collectionRef = collection(db, 'checklist');

	const [items, setItems] = useState<ChecklistItemRecord[] | DocumentData[]>(
		[]
	);

	useEffect(() => {
		const getChecklistItems = async () => {
			const data = await getDocs(collectionRef);
			const itemsFromDB = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			const sortedItems = itemsFromDB.sort(
				(
					a: ChecklistItemRecord | DocumentData,
					b: ChecklistItemRecord | DocumentData
				) => {
					const categoryA = a.category.toLowerCase(),
						categoryB = b.category.toLowerCase();
					if (categoryA < categoryB) return -1;
					if (categoryA > categoryB) return 1;
					return 0;
				}
			);
			sortedItems.forEach((item) => {
				setItems((oldstate) => [...oldstate, item]);
			});
		};
		getChecklistItems();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const HeaderButtons = () => (
		<Grid item container className={classes.headerButtons}>
			<IconButton
				color="secondary"
				onClick={handleReset}
				className={classes.resetButton}
			>
				<ReplayRounded fontSize="small" />
			</IconButton>
			<IconButton
				color="primary"
				onClick={handleNavigateToCreate}
				className={classes.addButton}
			>
				<AddRounded />
			</IconButton>
		</Grid>
	);

	const handleNavigateToCreate = () => {
		navigateTo('/add-checklist-item');
	};

	const handleReset = async () => {
		// navigateTo('/create-checklist-item');
		const resetedItems = items.forEach((item) => {
			setItems((oldstate) => [...oldstate, { ...item, checked: false }]);
		});
		console.log(resetedItems);
	};

	return (
		<Page title="Checklista">
			<Grid item container direction="column">
				<TitleHeader
					title="Checklista"
					navigateBackButton
					navigateTo="/"
					button={<HeaderButtons />}
				/>
			</Grid>
			<Grid
				item
				container
				direction="column"
				className={classes.listItemContainer}
			>
				{items.length > 0 ? (
					items.map((item) => (
						<ChecklistItem
							label={item.label}
							category={item.category}
							checked={item.checked}
							id={item.id}
							key={item.id}
						/>
					))
				) : (
					<Grid item container className={classes.spinnerContainer}>
						<CircularProgress className={classes.spinner} />
					</Grid>
				)}
			</Grid>
		</Page>
	);
};

export default ChecklistPage;
