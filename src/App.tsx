import { Canvas } from '@react-three/fiber';
import styles from './App.module.scss';
import { Perf } from 'r3f-perf';
import { useDevice } from './hooks/useDevice';
import { Joystick } from './components/Joystick';
import { Suspense } from 'react';
import { Environment } from './environment/Environment';
import { DefaultScene } from './scenes/DefaultScene';
import { Mods, useMode } from './store/useMode';
import { Controllers, Hands, VRButton, XR } from '@react-three/xr';
import Mode from './ui/Mode';

const dev = false;

function App() {
  const isMobile = useDevice();
  const mode = useMode(s => s.mode);

  if (mode === Mods.vr) {
    return (
      <div className={styles.app}>
        <Mode />
        <VRButton />
        <Canvas shadows>
        <XR>
          <Environment />
          <Controllers />
          <Hands />
          
          <DefaultScene />
        </XR>
        </Canvas>
      </div>
    );
  }
  
  return (
    <div className={styles.app}>
      <Mode />
      {isMobile && <Joystick />}
      <Canvas
        shadows
        onPointerDown={(e) => {
          if (e.pointerType === 'mouse') {
            (e.target as HTMLCanvasElement).requestPointerLock();
          }
        }}
      >
        <Suspense>
          {dev && <Perf position="top-left" />}
          <Environment />
          <DefaultScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
