import { isToday, isTomorrow, isThisWeek, fromUnixTime } from 'date-fns';

import { IWeather, IWeatherItem } from '../interfaces/weather.interface';

const weekObj: Record<number | string | symbol, string> = {
  0: 'ВС',
  1: 'ПН',
  2: 'ВТ',
  3: 'СР',
  4: 'ЧТ',
  5: 'ПТ',
  6: 'СБ',
};

export const getWeekDay = (num: number): string => {
  return weekObj[num];
};

export const getDate = (date: Date): string => {
  if (isToday(date)) {
    return 'Сегодня';
  }
  if (isTomorrow(date)) {
    return 'Завтра';
  }
  if (isThisWeek(date)) {
    const weekDay = date.getDay();
    return getWeekDay(weekDay);
  }
  return `${date.getDate()}/${date.getMonth() + 1}`;
};

export const sayWeather = (weather: IWeatherItem, about: string) => (): void => {
  const { humidity, pressure, feels_like, sunrise, sunset, temp, wind_speed } = weather;
  const sunriseTime = `${fromUnixTime(sunrise).getHours()} часов, ${fromUnixTime(sunrise).getMinutes()} минут`;
  const sunsetTime = `${fromUnixTime(sunset).getHours()} часов, ${fromUnixTime(sunset).getMinutes()} минут`;
  const voices = speechSynthesis.getVoices();
  const utterance = new SpeechSynthesisUtterance(`
    Сегодня: ${about}
    Температура: ${Math.trunc(temp)}° цельсия,
    Ощущается как: ${Math.trunc(feels_like)}° цельсия,
    Влажность: ${humidity}%,
    Скорость ветра: ${Math.trunc(wind_speed)} метров в секунду,
    Давление: ${pressure}миллиметров ртутного столба,
    Восход солнца в: ${sunriseTime},
    Закат солнца в: ${sunsetTime},
    `);
  utterance.voice = voices[0];
  speechSynthesis.speak(utterance);
};

export const normalizeTime = (date: Date) => {
  const splitedDate = date
    .toLocaleTimeString('ru-RU')
    .split(':');
  
  return splitedDate.slice(0, 2).join(':');
};

export const returnNormalizedData = (arr: any, current: IWeatherItem, city: string): IWeather => {
  const normalized: IWeatherItem[] = arr.map((day: any) => {
    const temp = day.temp.day;
    const feelsLike = day.feels_like.day;
    day.temp = temp;
    day.feels_like = feelsLike;
    return day;
  });
  const daily: IWeatherItem[] = [current, ...normalized.slice(1)];

  return {
    daily,
    city,
  };
};