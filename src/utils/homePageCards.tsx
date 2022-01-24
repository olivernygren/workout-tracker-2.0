import { MoonIcon, ProgressIcon, CardioIcon, CheckListIcon } from './icons';

export const homePageCards = [
	{
		label: 'Progress',
		icon: <ProgressIcon />,
		path: '/progress',
	},
	{
		label: 'Checklista',
		icon: <CheckListIcon />,
		path: '/checklist',
	},
	{
		label: 'Sömn',
		icon: <MoonIcon />,
		path: '/sleep',
	},
	{
		label: 'Cardio',
		icon: <CardioIcon />,
		path: '/cardio',
	},
];
