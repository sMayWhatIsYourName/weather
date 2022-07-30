import { CardLongProps } from './CardLong.props';
import styles from './CardLong.module.scss';
import cn from 'classnames';

const translate = {
  sunrise: {
    name: 'Восход',
  },
  sunset: {
    name: 'Закат',
  },
};

export const CardLong = ({ type, text, className, ...props }: CardLongProps): JSX.Element => {
  return (
    <div className={cn(className, styles.cardData, {
      [styles[type]]: true,
    })} {...props}>
      <dl>
        <dd className={cn(styles.description)}>
          <span className={styles.text}>{text}</span>
        </dd>
        <dt className={styles.termin}>{translate[type].name}</dt>
      </dl>
    </div>
  );
};