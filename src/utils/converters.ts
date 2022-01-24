export const workoutNameToPathConverter = (name: string) => {
	const lowerCaseName = name.toLowerCase();
	const dashed = lowerCaseName.replaceAll(' ', '-');
	const path = `/workout/${dashed}`;
	return path;
};
