import { MoonIcon, ProgressIcon, EvaluationIcon, CheckListIcon } from './icons';

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
		label: 'Daglig utvärdering',
		icon: <EvaluationIcon />,
		path: '/evaluation',
	},
	{
		label: 'Sömn',
		icon: <MoonIcon />,
		path: '/sleep',
	},
];
