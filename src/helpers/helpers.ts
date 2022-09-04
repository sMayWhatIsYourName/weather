import { isToday, isTomorrow, fromUnixTime } from 'date-fns';
import i18n from 'i18next';
import { Dispatch, SetStateAction } from 'react';

import { IWeatherDay, IWeatherItem } from '../interfaces/weather.interface';

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
  const weekDay = date.getDay();
  return getWeekDay(weekDay);
};

export const sayWeather = (weather: IWeatherItem, about: string, sunrise: string, sunset: string) => (setIsSpeaking: Dispatch<SetStateAction<boolean>>): void => {
  const { t } = i18n;
  const { humidity, pressure, feels_like, temp, wind_speed, dt } = weather;
  const [sunriseHours, sunriseMinutes] = sunrise.split(':');
  const [sunsetHours, sunsetMinutes] = sunset.split(':');
  const sunriseTime = `${t('units.hours', { count: +sunriseHours })}, ${t('units.minutes', { count: +sunriseMinutes })}`;
  const sunsetTime = `${t('units.hours', { count: +sunsetHours })}, ${t('units.minutes', { count: +sunsetMinutes })}`;
  const voices = speechSynthesis.getVoices();
  const dateFromTimestamp = fromUnixTime(dt);
  let day = t(`week.${dateFromTimestamp.getDay()}`);
  if (isToday(dateFromTimestamp)) {
    day = 'Сегодня';
  } else if (isTomorrow(dateFromTimestamp)) {
    day = 'Завтра';
  }
  const utterance = new SpeechSynthesisUtterance(`
    Погода на ${day}
    Будет: ${about}
    Температура: ${Math.trunc(temp)}° цельсия,
    Ощущается как: ${Math.trunc(feels_like)}° цельсия,
    Влажность: ${humidity}%,
    Скорость ветра: ${t('units.meters', { count: Math.trunc(wind_speed) })} в секунду,
    Давление: ${t('units.millimeters', { count: pressure })} ртутного столба,
    Восход солнца в: ${sunriseTime},
    Закат солнца в: ${sunsetTime},
    `);
  utterance.addEventListener('end', () => {
    setIsSpeaking(false);
  });
  utterance.voice = voices[0];
  speechSynthesis.speak(utterance);
};

export const normalizeTime = (date: Date, timeZone: string) => {
  const splitedDate = date
    .toLocaleTimeString('ru-RU', { timeZone, })
    .split(':');
  
  return splitedDate.slice(0, 2).join(':');
};

export const returnNormalizedData = (arr: any, current: IWeatherItem): IWeatherDay[] => {
  const normalized: IWeatherItem[] = arr.map((day: any) => {
    const temp = day.temp.day;
    const feelsLike = day.feels_like.day;
    day.temp = temp;
    day.feels_like = feelsLike;
    return day;
  });
  return [current, ...normalized].map((day, i) => ({ data: day, id: i }));
};