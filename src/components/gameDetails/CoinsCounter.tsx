import { useCoinsStore } from '../../store/useCoins';
import styles from '../../ui/ui.module.scss';

import CoinImage from './assets/coin.png';


export const CoinsCounter = () => {
  const counter = useCoinsStore(s => s.counter);
  return (
    <div className={styles.coinCounterWrapper}>
      <img className={styles.coinImage} src={CoinImage} alt="Coin" />
      <span className={styles.counter}>: {counter}</span>
    </div>
  );
}
