import { useForm, SubmitHandler } from 'react-hook-form';
import  { useEffect } from 'react';
import { memo } from 'react';

import { SearchProps } from './Search.props';
import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import fetchWeatherFromCity from '../../slices/latAndLonSlice';
import { AppDispatch } from '../../slices';

interface IFormCity {
  city: string;
}

export const Search = memo(({ city }: SearchProps): JSX.Element => {
  const { register, setFocus, handleSubmit } = useForm<IFormCity>({ defaultValues: { city } });
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit: SubmitHandler<IFormCity> = ({ city }) => {
    dispatch(fetchWeatherFromCity(city));
  };
  useEffect(() => {
    setFocus('city');
  }, [setFocus])
  return (
    <div className={styles.outter}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <button type="submit" className={styles.button}>
          <svg className={styles.icon} width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.4173 23.4065C20.7723 21.1018 24 17.421 24 14.5589C24 10.0529 20.4183 6.40002 16 6.40002C11.5817 6.40002 8 10.0529 8 14.5589C8 17.421 11.2277 21.1018 13.5827 23.4065C14.9417 24.7365 17.0583 24.7365 18.4173 23.4065Z" stroke="black" strokeWidth="2" />
            <circle cx="15.9996" cy="14.4" r="2.4" stroke="black" strokeWidth="2" />
          </svg>
        </button>
        <input type="text" className={styles.search} {...register('city', { required: true, minLength: 3 })} />
      </form>
    </div>
  );
});