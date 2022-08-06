import styles from './Loader.module.css';

export const Loader = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <progress className={styles['pure-material-progress-circular']} />
    </div>
  );
};