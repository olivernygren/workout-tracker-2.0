import {
	CardioIcon,
	CheckListIcon,
	FoodIcon,
	HomeIcon,
	PillIcon,
	ScaleSmallIcon,
} from './icons';
import { checklistCategoriesEnum } from './enums';

export const getChecklistCategoryColor = (category: string) => {
	switch (category) {
		case checklistCategoriesEnum.CARDIO:
			return '#9BD7A4';
		case checklistCategoriesEnum.SUPPLEMENTS:
			return '#8DD2DB';
		case checklistCategoriesEnum.WEIGHT:
			return '#DB8D8D';
		case checklistCategoriesEnum.FOOD:
			return '#FFF8B5';
		case checklistCategoriesEnum.HOUSEHOLD:
			return '#E7B5FF';
		default:
			return '#fff';
	}
};

export const GetChecklistCategoryIcon = (category: string) => {
	switch (category) {
		case checklistCategoriesEnum.CARDIO:
			return <CardioIcon />;
		case checklistCategoriesEnum.SUPPLEMENTS:
			return <PillIcon />;
		case checklistCategoriesEnum.WEIGHT:
			return <ScaleSmallIcon />;
		case checklistCategoriesEnum.FOOD:
			return <FoodIcon />;
		case checklistCategoriesEnum.HOUSEHOLD:
			return <HomeIcon />;
		default:
			return <CheckListIcon />;
	}
};

export const checklistCategories: string[] = [
	checklistCategoriesEnum.CARDIO,
	checklistCategoriesEnum.SUPPLEMENTS,
	checklistCategoriesEnum.WEIGHT,
	checklistCategoriesEnum.FOOD,
	checklistCategoriesEnum.HOUSEHOLD,
];
