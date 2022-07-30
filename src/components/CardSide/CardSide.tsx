import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { CardSideProps } from './CardSide.props';
import styles from './CardSide.module.scss';
import { CardSmall } from '../CardSmall/CardSmall';
import { WeatherContext } from '../../contexts/index';
import { fromUnixTime } from 'date-fns';
import { getDate } from '../../helpers/helpers';
import { actions } from '../../slices/weatherSlice';

export const CardSide = ({ weather, weatherId }: CardSideProps): JSX.Element => {
  const { t } = useTranslation();
  const { setCurrentWeatherId } = useContext(WeatherContext);
  const about = t(`weather.${weather.weather[0].main}`);
  
  return (
    <article onClick={() => {
      console.log(weatherId);
      setCurrentWeatherId(weatherId)
      actions.setCurrent({ weather });
    }} className={styles.outter}>
      <p className={styles.date}>{getDate(fromUnixTime(weather.dt))}</p>
      <div className={styles.current} style={{
        backgroundImage: `url(/icons/${weather.weather[0].icon}.png)`,
      }}>
        <p className={styles.temp}>
          <span>{Math.trunc(weather.temp)}</span>°
        </p>
        <p className={styles.about}>{about}</p>
        <div className={styles.wrapper}>
          <CardSmall text={Math.trunc(weather.feels_like)} type='feels' />
          <CardSmall text={weather.humidity} type='humidity' />
          <CardSmall text={Math.trunc(weather.wind_speed)} type='wind' />
        </div>
      </div>
      <hr className={styles.line} />
    </article>
  );
};