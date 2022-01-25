import menu from '../icons/menu.svg';
import moon from '../icons/moon.svg';
import progress from '../icons/progress.svg';
import cardio from '../icons/cardio.svg';
import checklist from '../icons/checklist.svg';
import evaluation from '../icons/evaluation.svg';

interface IIcon {
	className?: string;
}

export const MenuIcon = ({ className }: IIcon) => {
	return <img className={className} src={menu} alt="Meny"></img>;
};
export const MoonIcon = ({ className }: IIcon) => {
	return <img className={className} src={moon} alt="Måne"></img>;
};
export const ProgressIcon = ({ className }: IIcon) => {
	return <img className={className} src={progress} alt="Progress"></img>;
};
export const CheckListIcon = ({ className }: IIcon) => {
	return <img className={className} src={checklist} alt="Checklista"></img>;
};
export const CardioIcon = ({ className }: IIcon) => {
	return <img className={className} src={cardio} alt="Cardio"></img>;
};
export const EvaluationIcon = ({ className }: IIcon) => {
	return <img className={className} src={evaluation} alt="Utvärdering"></img>;
};
