export const workoutNameToPathConverter = (name: string) => {
  const lowerCaseName = name.toLowerCase();
  const dashed = lowerCaseName.replaceAll(' ', '-');
  const path = `/workout/${dashed}`;
  return path;
};

export const exerciseNameToPathConverter = (name: string) => {
  const lowerCaseName = name.toLowerCase();
  const dashed = lowerCaseName.replaceAll(' ', '-');
  const path = `${dashed}`;
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
};

export const pathToExerciseNameConverter = (path: string) => {
  const removedSlashes = path.replaceAll('/', '');
  const spaced = removedSlashes.replaceAll('-', ' ');
  const splitArray: string[] = spaced.split(' ');
  splitArray.forEach((word, i) => {
    splitArray[i] =
      splitArray[i].charAt(0).toUpperCase() + splitArray[i].slice(1);
  });
  const word = splitArray.join(' ');
  return word;
};

export const removeZero = (dateSection: string) => {
  if (dateSection.substring(0, 1) === '0') {
    return dateSection.substring(1, 2);
  } else {
    return dateSection;
  }
};

export const addZero = (dateSection: number) => {
  if (dateSection < 10) {
    return `0${dateSection}`;
  } else {
    return dateSection;
  }
};

export const formatDate = (date: string) => {
  const year = `20${date.substring(0, 2)}`;
  const month = date.substring(2, 4);
  const day = date.substring(4, 6);
  const dateToReturn = `${removeZero(day)} ${getMonthName(month)} ${year}`;
  return dateToReturn;
};

export const formatDateShort = (date: string) => {
  const month = date.substring(2, 4);
  const day = date.substring(4, 6);
  const dateToReturn = `${removeZero(day)} ${getMonthName(month)
    .substring(0, 3)
    .toLowerCase()}`;
  return dateToReturn;
};

export const getMonthName = (month: string) => {
  switch (month) {
    case '01':
      return 'Januari';
    case '02':
      return 'Februari';
    case '03':
      return 'Mars';
    case '04':
      return 'April';
    case '05':
      return 'Maj';
    case '06':
      return 'Juni';
    case '07':
      return 'Juli';
    case '08':
      return 'Augusti';
    case '09':
      return 'September';
    case '10':
      return 'Oktober';
    case '11':
      return 'November';
    case '12':
      return 'December';
    default:
      return '-';
  }
};

export const getCurrentTime = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const fullString = `${year}${addZero(month + 1)}${addZero(date)}${addZero(
    hours
  )}${addZero(minutes)}${addZero(seconds)}`;
  return fullString;
};

export const dotToCommaConverter = (number: number) => {
  const numberAsString = number.toString();
  const numberToReturn = numberAsString.replaceAll('.', ',');
  return numberToReturn;
};

export const commaToDotConverter = (number: string) => {
  const withDot = number.replaceAll(',', '.');
  const numberFormat = parseFloat(withDot);
  return numberFormat;
};
