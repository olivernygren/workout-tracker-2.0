export const chunk = (array: any[], size: number) => {
	if (!array.length) {
		return [];
	}
	// const reversedArray = [...array].reverse();
	// console.log(reversedArray);
	const head = array.slice(0, size);
	const tail = array.slice(size);
	const arrayToReturn: any[] = [head, ...chunk(tail, size)];

	return arrayToReturn;
};
