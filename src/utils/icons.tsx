import menu from '../icons/menu.svg';
import moon from '../icons/moon.svg';
import progress from '../icons/progress.svg';
import cardio from '../icons/cardio.svg';
import checklist from '../icons/checklist.svg';
import evaluation from '../icons/evaluation.svg';
import scale from '../icons/scale.svg';
import pill from '../icons/pill.svg';
import house from '../icons/house.svg';
import food from '../icons/food.svg';
import scaleSmall from '../icons/scale-small.svg';

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
export const ScaleIcon = ({ className }: IIcon) => {
	return <img className={className} src={scale} alt="Våg"></img>;
};
export const PillIcon = ({ className }: IIcon) => {
	return <img className={className} src={pill} alt="Piller"></img>;
};
export const FoodIcon = ({ className }: IIcon) => {
	return <img className={className} src={food} alt="Mat"></img>;
};
export const HomeIcon = ({ className }: IIcon) => {
	return <img className={className} src={house} alt="Hushåll"></img>;
};
export const ScaleSmallIcon = ({ className }: IIcon) => {
	return <img className={className} src={scaleSmall} alt="Våg liten"></img>;
};
