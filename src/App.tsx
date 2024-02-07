import { Canvas } from '@react-three/fiber';
import styles from './App.module.scss';
import { Perf } from 'r3f-perf';
import { useDevice } from './hooks/useDevice';
import { Joystick } from './components/Joystick';
import { Suspense } from 'react';
import { Environment } from './environment/Environment';
// import { DefaultScene } from './scenes/DefaultScene';
import { Mods, useMode } from './store/useMode';
import { Controllers, Hands, VRButton, XR } from '@react-three/xr';
import Mode from './ui/Mode';
import { TempScene } from './scenes/TempScene';

const dev = false;

function App() {
  const isMobile = useDevice();
  const mode = useMode(s => s.mode);

  return (
    <div className={styles.app}>
      <Mode />
      {{
        vr: () => (
          <>
            <VRButton />
            <Canvas shadows>
            <XR>
              <Environment />
              <Controllers />
              <Hands />
              
              <TempScene isVr />
              {/* <DefaultScene /> */}
            </XR>
            </Canvas>
          </>
        ),
        default: () => (
          <>
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
                {dev && <Perf position="bottom-left" />}
                <Environment />
                <TempScene />
                {/* <DefaultScene /> */}
              </Suspense>
            </Canvas>
          </>
        )
      }[mode]()}
    </div>
  );
}

export default App;
