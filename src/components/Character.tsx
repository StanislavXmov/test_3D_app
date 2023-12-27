import { KeyboardControls } from '@react-three/drei';
import { RapierRigidBody } from '@react-three/rapier';
import Ecctrl, { EcctrlAnimation, EcctrlProps } from 'ecctrl';
import { ForwardRefExoticComponent, RefAttributes, useEffect, useRef } from 'react';
import { CharacterModel } from './CharacterModel';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { usePosition } from '../store/usePosition';

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
  const position = usePosition(s => s.position);

  const controllerRef = useRef<RapierRigidBody>();

  useEffect(() => {
    const body = controllerRef.current;
    if (body) {
      body.sleep();
    }

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
