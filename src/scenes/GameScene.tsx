import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { Mods, useMode } from '../store/useMode';
import { Character } from '../components/Character';
import { VRPlayer } from '../components/VRPlayer';
import { Model } from '../components/Model';
import { Vector3 } from 'three';
import { Coin } from '../components/gameDetails/Coin';

const vrD = 1.8;
const vrScale = new Vector3(vrD, vrD, vrD);
const scale = new Vector3(1, 1, 1);

const getPosition = (v: Vector3, isVr: boolean) => {
  if (isVr) {
    return new Vector3(v.x * vrD, v.y * vrD, v.z * vrD);
  }
  return v;
}

export const GameScene = ({isVr}: {isVr?: boolean}) => {
  const mode = useMode(s => s.mode);
  const width = isVr ? 32 * vrD : 32;

  let gameController = <Character />;
  if (mode === Mods.vr) {
    gameController = <VRPlayer />;
  }
  
  return (
    <Physics timeStep="vary" debug={false}>
      {gameController}
      <RigidBody 
        type="fixed" 
        colliders="trimesh"
        position={[0, -0.5, 0]} 
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[width, 1, width]} />
          <meshStandardMaterial color={'#2e2e2e'} />
        </mesh>
      </RigidBody>
      <Coin isVr={isVr} position={new Vector3(8, 1, 0)} />
      <Coin isVr={isVr} position={new Vector3(6, 1, 0)} />
      <Coin isVr={isVr} position={new Vector3(4, 1, 0)} />
      <Coin isVr={isVr} position={new Vector3(2, 1, 0)} />
    </Physics>
  );
}
