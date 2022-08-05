import cn from 'classnames';

import { NavigationButtonProps } from './NavigationButton.props';
import styles from './NavigationButton.module.scss';

export const NavigationButton = ({ type, ...props }: NavigationButtonProps): JSX.Element => {
  return (
    <button className={cn({
      next: type === 'next',
      prev: type === 'prev',
      [styles.next]: type === 'next',
      [styles.prev]: type === 'prev',
      [styles.button]: true,
    })} {...props} />
  );
};