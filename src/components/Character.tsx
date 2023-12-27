import { KeyboardControls } from '@react-three/drei';
import { RapierRigidBody } from '@react-three/rapier';
import Ecctrl, { EcctrlAnimation, EcctrlProps } from 'ecctrl';
import { ForwardRefExoticComponent, RefAttributes, useEffect, useRef } from 'react';
import { CharacterModel } from './CharacterModel';
import { usePosition } from '../store/usePosition';
import { useFrame } from '@react-three/fiber';
import { usePointer } from '../store/usePointer';
import { Vector3 } from 'three';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['Shift'] },
  { name: 'action1', keys: ['KeyE']}
];

const animationSet = {
  idle: 'idle',
  walk: 'walk',
  run: 'run',
  jump: 'jump',
  jumpIdle: 'jump',
  jumpLand: 'jump',
  fall: 'jump',
  action1: 'dance',
  action2: '',
  action3: '',
  action4: ''
}

const EcctrlController = Ecctrl as unknown as ForwardRefExoticComponent<EcctrlProps & RefAttributes<RapierRigidBody>>;

export const Character = () => {
  const startVoxel = usePointer(s => s.startVoxel);
  const position = usePosition(s => s.position);
  const setPosition = usePosition(s => s.setPosition);

  const controllerRef = useRef<RapierRigidBody>();

  useEffect(() => {
    const body = controllerRef.current;
    if (body) {
      body.sleep();
    }

    setPosition(new Vector3(startVoxel.x, startVoxel.y + 2.24, startVoxel.z));

    const unsubsribePosition = usePosition.subscribe(
      (state) => state.position,
      (value) => {
        const body = controllerRef.current;
        if (body) {
          body.sleep();
          body.setTranslation(value, true);
        }
      }
    );

    return () => unsubsribePosition();
  }, []);

  useFrame(() => {
    const body = controllerRef.current;
    if (body) {
      if (body.translation().y < -5) {
        body.sleep();
        body.setTranslation(position, true);
      }
    }
  });

  return (
    <KeyboardControls map={keyboardMap}>
      <EcctrlController 
        ref={controllerRef} 
        position={position} 
        animated followLight 
        jumpVel={5}
      >
        <EcctrlAnimation characterURL='./character_model.glb' animationSet={animationSet} >
          <CharacterModel />
        </EcctrlAnimation>
      </EcctrlController>
    </KeyboardControls>
  )
};
