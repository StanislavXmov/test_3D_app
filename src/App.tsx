import { Canvas } from '@react-three/fiber';
import styles from './App.module.scss';
import { Perf } from 'r3f-perf';
import { useDevice } from './hooks/useDevice';
import { Joystick } from './components/Joystick';
import { Suspense } from 'react';
import { Environment } from './environment/Environment';
import { DefaultScene } from './scenes/DefaultScene';

const dev = false;

function App() {
  const isMobile = useDevice();
  
  return (
    <div className={styles.app}>
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
