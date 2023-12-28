import { Mods, useMode } from '../store/useMode';
import styles from './ui.module.scss';

const Mode = () => {
  const mode = useMode(s => s.mode);
  const setDefault = useMode(s => s.setDefault);
  const setVR = useMode(s => s.setVR);

  const buttonHandler = (type: Mods) => {
    if (mode === type) {
      return;
    }
    if (type === Mods.default) {
      setDefault();
    } else {
      setVR();
    }
  }
  
  return (
    <div className={styles.modeWrapper}>
      <span>Mode:</span>
      <button 
        className={`${styles.button} ${mode === Mods.default ? styles.active : ''}`}
        onClick={() => buttonHandler(Mods.default)}
      >
        Default
      </button>
      <button 
        className={`${styles.button} ${mode === Mods.vr ? styles.active : ''}`}
        onClick={() => buttonHandler(Mods.vr)}
      >
        VR
      </button>
    </div>
  );
}

export default Mode