import { User } from '../models/user';

const fullMonthDays = Array.from({ length: 31 }, (v, k) => k + 1);

const getTime = (str: string): number => {
  const splittedStr = str.split('-');
  return (Number(splittedStr[0]) * 60 + Number(splittedStr[1])) * 60;
};

export const formatTime = (time: number): string => {
  if (time === 0) return '0';
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60 - (hours * 60));
  return `${hours}:${minutes}`;
};

export const getTitles = () => ['Username', ...fullMonthDays, 'Total'].map((cell) => ({
  id: cell.toString().toLowerCase(),
  label: cell.toString(),
}));

export const formatData = (usersData: User[]) => usersData.map((userData) => {
  const formattedDays = userData.Days.map((day) => {
    return {
      day: new Date(day.Date).getDate(),
      time: getTime(day.End) - getTime(day.Start),
    };
  });
  const formattedFullDays = fullMonthDays.reduce((acc, day) => {
    const existingDay = formattedDays.find((formattedDay) => formattedDay.day === day);
    return {
      ...acc,
      [day.toString()]: existingDay ? existingDay.time : 0,
      total: existingDay ? acc.total + existingDay.time : acc.total,
    };
  }, { total: 0 });
  return {
    username: userData.Fullname,
    ...formattedFullDays,
  };
});
