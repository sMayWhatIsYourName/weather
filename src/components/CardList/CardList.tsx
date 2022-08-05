import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper';

import styles from './CardList.module.scss';
import { CardCurrent } from '../CardCurrent/CardCurrent';
import { CardSide } from '../CardSide/CardSide';
import { WeatherContext } from '../../contexts';
import { IWeather } from '../../interfaces/weather.interface';
import { NavigationButton } from '../NavigationButton/NavigationButton';

export const CardList = (): JSX.Element => {
  const { daily: week, city } = useSelector((state: IWeather) => state);
  const { currentWeatherId } = useContext(WeatherContext);
  const current = week.find((_day, i) => i === currentWeatherId);
  if (current === undefined) {
    return <div></div>;
  }
  return (
    <div className={styles.wrapper}>
      <NavigationButton type='prev' />
      <Swiper
        modules={[Navigation, Mousewheel]}
        slidesPerView='auto'
        spaceBetween={30}
        navigation={{
          nextEl: '.next',
          prevEl: '.prev',
        }}
        mousewheel
      >
        {week.map((day, i) => {
          if (currentWeatherId === i) {
            return (
              <SwiperSlide key={day.dt}>
                <CardCurrent weather={current} city={city} />
              </SwiperSlide>
            );
          }
          return (
            <SwiperSlide key={day.dt}>
              <CardSide weather={day} weatherId={i} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <NavigationButton type='next' />
    </div>
  );
};