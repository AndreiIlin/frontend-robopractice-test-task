export const getDays = () => Array.from({ length: 31 }, (v, k) => k + 1);

export const getTime = (str: string): number => {
  const splittedStr = str.split('-');
  return (Number(splittedStr[0]) * 60 + Number(splittedStr[1])) * 60;
};

export const getFormattedTime = (time: number): string => {
  if (time === 0) return '0';
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60 - (hours * 60));
  return `${hours}:${minutes}`;
};

export const getTableHeadCells = () => {
  const days = getDays();
  return ['User', ...days, 'Total'].map((cell) => ({
    id: cell.toString(),
    label: cell.toString(),
  }));
};
