import { fromUnixTime } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { CardCurrentProps } from './CardCurrent.props';
import styles from './CardCurrent.module.scss';
import { Search } from '../Search/Search';
import { CardSmall } from '../CardSmall/CardSmall';
import { ListenButton } from '../ListenButton/ListenButton';
import { CardLong } from '../CardLong/CardLong';
import { getDate, sayWeather, normalizeTime } from '../../helpers/helpers';
import { IWeather } from '../../interfaces/weather.interface';
import { useEffect } from 'react';

export const CardCurrent = (props: CardCurrentProps): JSX.Element => {
  const { city, chosenId, daily } = useSelector((state: IWeather) => state);
  const weather = daily.find(({ id }) => id === chosenId);
  const { t } = useTranslation();
  
  useEffect(() => {
    speechSynthesis.cancel();
  }, []);
  if (weather === undefined) {
    return <div></div>;
  }
  const { data } = weather;
  const about = t(`weather.${data.weather[0].main}`);
  const sunriseFormatted = normalizeTime(fromUnixTime(data.sunrise));
  
  const sunsetFormatted = normalizeTime(fromUnixTime(data.sunset));
  
  return (
    <article className={styles.outter} {...props}>
      <p className={styles.date}>{getDate(fromUnixTime(data.dt))}</p>
      <div className={styles.current} style={{
        backgroundImage: `url(/icons/${data.weather[0].icon}.svg)`,
      }}>
        <Search city={city} />
        <p className={styles.temp}>
          <span>{Math.trunc(data.temp)}</span>°
        </p>
        <p className={styles.about}>{about}</p>
        <div className={styles.wrapper}>
          <CardSmall text={Math.trunc(data.feels_like)} type='feels' />
          <CardSmall text={data.humidity} type='humidity' />
          <CardSmall text={Math.trunc(data.wind_speed)} type='wind' />
          <CardLong className={styles.chosen} text={sunriseFormatted} type='sunrise' />
          <CardSmall className={styles.pressure} text={data.pressure} type='pressure' />
          <ListenButton sayWeather={sayWeather(data, about)} />
          <CardLong className={styles.chosen} text={sunsetFormatted} type='sunset' />
        </div>
      </div>
      <hr className={styles.line} />
    </article>
  );
};