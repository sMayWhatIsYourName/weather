import { fromUnixTime } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { CardCurrentProps } from './CardCurrent.props';
import styles from './CardCurrent.module.scss';
import { Search } from '../Search/Search';
import { CardSmall } from '../CardSmall/CardSmall';
import { CardLong } from '../CardLong/CardLong';
import { getDate, sayWeather, normalizeTime } from '../../helpers/helpers';

export const CardCurrent = ({ city, weather }: CardCurrentProps): JSX.Element => {
  const { t } = useTranslation();

  if (weather === undefined) {
    return <div></div>;
  }
  const about = t(`weather.${weather.weather[0].main}`);
  const sunriseFormatted = normalizeTime(fromUnixTime(weather.sunrise));
  
  const sunsetFormatted = normalizeTime(fromUnixTime(weather.sunset));
  
  return (
    <article className={styles.outter}>
      <p className={styles.date}>{getDate(fromUnixTime(weather.dt))}</p>
      <div className={styles.current} style={{
        backgroundImage: `url(/icons/${weather.weather[0].icon}.png)`,
      }}>
        <Search city={city} />
        <p className={styles.temp}>
          <span>{Math.trunc(weather.temp)}</span>°
        </p>
        <p className={styles.about}>{about}</p>
        <div className={styles.wrapper}>
          <CardSmall text={Math.trunc(weather.feels_like)} type='feels' />
          <CardSmall text={weather.humidity} type='humidity' />
          <CardSmall text={Math.trunc(weather.wind_speed)} type='wind' />
          <CardLong className={styles.chosen} text={sunriseFormatted} type='sunrise' />
          <CardSmall text={weather.pressure} type='pressure' />
          <CardSmall sayWeather={sayWeather(weather, about)} type='button' />
          <CardLong className={styles.chosen} text={sunsetFormatted} type='sunset' />
        </div>
      </div>
      <hr className={styles.line} />
    </article>
  );
};