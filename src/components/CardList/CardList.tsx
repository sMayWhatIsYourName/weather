import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper';

import styles from './CardList.module.scss';
import { CardCurrent } from '../CardCurrent/CardCurrent';
import { CardSide } from '../CardSide/CardSide';
import { IWeather } from '../../interfaces/weather.interface';
import { NavigationButton } from '../NavigationButton/NavigationButton';
import { Loader } from '../Loader/Loader';

export const CardList = (): JSX.Element => {
  const week = useSelector((state: IWeather) => state.daily.map((day) => day.id));
  const chosenId = useSelector((state: IWeather) => state.chosenId);
  const deviceWidth = window.innerWidth;
  return (
    week.length === 0
    ? 
    <Loader />
    :
    <div className={styles.wrapper}>
      <NavigationButton type='prev' />
      <Swiper
        modules={[Navigation, Mousewheel]}
        slidesPerView='auto'
        spaceBetween={deviceWidth > 768 ? 30 : 25}
        navigation={{
          nextEl: '.next',
          prevEl: '.prev',
        }}
        mousewheel
      >
        {week.map((id) => (
          <SwiperSlide key={id}>
            {chosenId === id ? <CardCurrent /> : <CardSide dayId={id} />}
          </SwiperSlide>
        )
        )}
      </Swiper>
      <NavigationButton type='next' />
    </div>
  );
};