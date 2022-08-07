import { CardSmallProps } from './CardSmall.props';
import styles from './CardSmall.module.scss';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

export const CardSmall = ({ text, type, className, ...props }: CardSmallProps): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className={cn(styles.cardData, className)} {...props}>
      <dl>
        <dd className={cn(styles.description, {
          [styles.flex]: type === 'feels',
        })}>
          <span className={styles.text}>{text}</span>
          {t(`response.${type}.value`)}
        </dd>
        <dt className={styles.termin}>{t(`response.${type}.name`)}</dt>
      </dl>
    </div>
  );
};