export const workoutNameToPathConverter = (name: string) => {
	const lowerCaseName = name.toLowerCase();
	const dashed = lowerCaseName.replaceAll(' ', '-');
	const path = `/workout/${dashed}`;
	return path;
};

export const pathToWorkoutNameConverter = (path: string) => {
	const removedSlashes = path.replaceAll('/', '');
	const spaced = removedSlashes.replaceAll('-', ' ');
	const splitArray: string[] = spaced.split(' ');
	splitArray.forEach((word, i) => {
		splitArray[i] =
			splitArray[i].charAt(0).toUpperCase() + splitArray[i].slice(1);
	});
	const word = splitArray.join(' ');
	return word;
	// const lowerCaseName = path.toUpperCase();
	// const path = `/workout/${dashed}`;
	// return path;
};
