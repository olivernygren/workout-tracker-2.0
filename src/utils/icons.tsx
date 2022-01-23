import menu from '../icons/menu.svg';

interface IIcon {
	className?: string;
}

export const Menu = ({ className }: IIcon) => {
	return <img className={className} src={menu} alt="Meny"></img>;
};
