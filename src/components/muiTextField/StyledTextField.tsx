import { InputAdornment, TextField } from '@material-ui/core';

import useStyles from './styles';

interface IStyledTextField {
	placeholder?: string;
	icon?: {
		position: 'start' | 'end';
		element: JSX.Element;
	};
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	fullWidth?: boolean;
}

export const StyledTextField = ({
	placeholder,
	icon,
	onChange,
	fullWidth,
}: IStyledTextField) => {
	const classes = useStyles();
	const iconPaddingAdjust = !icon ? { paddingLeft: 8 } : { paddingLeft: 0 };
	const iconAdornment = icon && (
		<InputAdornment position={icon.position} className={classes.inputIcon}>
			{icon.element}
		</InputAdornment>
	);

	return (
		<TextField
			variant="filled"
			fullWidth={fullWidth}
			placeholder={placeholder}
			onChange={onChange}
			inputProps={{ className: classes.muiInput }}
			InputProps={{
				className: classes.muiInput,
				style: iconPaddingAdjust,
				startAdornment: iconAdornment,
			}}
		/>
	);
};

export default StyledTextField;
