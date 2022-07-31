import { useSelector } from 'react-redux';
import { useContext } from 'react';

import styles from './CardList.module.scss';
import { CardCurrent } from '../CardCurrent/CardCurrent';
import { CardSide } from '../CardSide/CardSide';
import { WeatherContext } from '../../contexts';
import { IWeather } from '../../interfaces/weather.interface';

export const CardList = (): JSX.Element => {
  const { daily: week, city } = useSelector((state: IWeather) => state);
  const { currentWeatherId } = useContext(WeatherContext);
  const current = week.find((_day, i) => i === currentWeatherId);
  if (current === undefined) {
    return <div></div>;
  }
  const weekX = week.slice(0, 4);
  return (
    <div className={styles.wrapper}>
      {weekX.map((day, i) => {
        if (currentWeatherId === i) {
          return <CardCurrent key={i} weather={current} city={city} />
        }
        return <CardSide key={i} weather={day} weatherId={i} />
      })}
    </div>
  );
};