import cn from 'classnames';
import { memo, useState } from 'react';

import { ListenButtonProps } from './ListenButton.props';
import styles from './ListenButton.module.scss';
import cardSmallStyles from '../CardSmall/CardSmall.module.scss';

export const ListenButton = memo(({ sayWeather, about, ...props }: ListenButtonProps): JSX.Element => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  console.log(isSpeaking);
  
  return (
    <div className={cn(cardSmallStyles.cardData, styles.btn)} onClick={() => {
      if (isSpeaking) {
        speechSynthesis.pause();
        setIsSpeaking(false);
      } else {
        if (speechSynthesis.paused) {
          speechSynthesis.resume();
        } else {
          sayWeather();
        }
        setIsSpeaking(true);
      }
    }}>
      <button {...props} className={cn(styles.button, {
        [styles.pause]: isSpeaking,
      })} />
    </div>
  );
});
