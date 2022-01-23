import { useEffect } from 'react';

export const SetPageTitle = (title: string) => {
	useEffect(() => {
		document.title = title;
	}, [title]);
};
