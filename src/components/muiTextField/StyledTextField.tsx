import { InputAdornment, TextField } from '@material-ui/core';

import useStyles from './styles';

interface IStyledTextField {
	placeholder?: string;
	icon?: {
		position: 'start' | 'end';
		element: JSX.Element;
	};
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: () => void;
	onFocus?:
		| (() => void)
		| ((event: React.ChangeEvent<HTMLInputElement>) => void);
	fullWidth?: boolean;
	value?: any;
	defaultValue?: any;
	className?: string;
	small?: boolean;
	tiny?: boolean;
	label?: string;
}

export const StyledTextField = ({
	placeholder,
	icon,
	onChange,
	onBlur,
	// onFocus,
	fullWidth,
	value,
	defaultValue,
	className,
	small,
	tiny,
	label,
}: IStyledTextField) => {
	const classes = useStyles();
	const iconPaddingAdjust =
		!tiny && !small && !icon ? { paddingLeft: 8 } : { paddingLeft: 0 };
	const iconAdornment = icon && (
		<InputAdornment position={icon.position} className={classes.inputIcon}>
			{icon.element}
		</InputAdornment>
	);
	const inputClass = small
		? classes.smallInput
		: tiny
		? classes.tinyInput
		: classes.muiInput;
	const parentDivClass = small || tiny ? classes.divParent : classes.muiInput;

	return (
		<TextField
			variant="filled"
			fullWidth={fullWidth}
			placeholder={placeholder}
			onChange={onChange}
			onBlur={onBlur}
			value={value}
			defaultValue={defaultValue}
			label={label}
			className={className}
			inputProps={{ className: inputClass }}
			InputProps={{
				className: parentDivClass,
				style: iconPaddingAdjust,
				startAdornment: iconAdornment,
			}}
		/>
	);
};

export default StyledTextField;
