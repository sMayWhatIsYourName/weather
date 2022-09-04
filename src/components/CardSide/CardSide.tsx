import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { memo } from 'react';

import { CardSideProps } from './CardSide.props';
import styles from './CardSide.module.scss';
import cardCurrentStyles from '../CardCurrent/CardCurrent.module.scss';
import { CardSmall } from '../CardSmall/CardSmall';
import { fromUnixTime } from 'date-fns';
import { getDate } from '../../helpers/helpers';
import { actions } from '../../slices/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IWeather } from '../../interfaces/weather.interface';

export const CardSide = memo(({ dayId, ...props }: CardSideProps): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const weather = useSelector(({ daily }: IWeather) => daily.find(({ id }) => id === dayId));
  if (weather === undefined) {
    return <div></div>;
  }
  const { data } = weather;
  const about = t(`weather.${data.weather[0].main}`);
  
  return (
    <article onClick={() => {
      dispatch(actions.setCurrent({ id: dayId }));
    }} {...props} className={styles.outter}>
      <p className={cn(cardCurrentStyles.date, styles.date)}>{getDate(fromUnixTime(data.dt))}</p>
      <div className={cn(cardCurrentStyles.current, styles.current)} style={{
        backgroundImage: `url(/icons/${data.weather[0].icon}.svg)`,
      }}>
        <p className={cn(cardCurrentStyles.temp, styles.temp)}>
          <span>{Math.trunc(data.temp)}</span>°
        </p>
        <p className={cardCurrentStyles.about}>{about}</p>
        <div className={styles.wrapper}>
          <CardSmall text={Math.trunc(data.feels_like)} type='feels' />
          <CardSmall text={data.humidity} type='humidity' />
          <CardSmall text={Math.trunc(data.wind_speed)} type='wind' />
        </div>
      </div>
      <hr className={cn(cardCurrentStyles.line, styles.line)} />
    </article>
  );
});