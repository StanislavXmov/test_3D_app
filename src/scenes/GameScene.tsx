import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { Mods, useMode } from '../store/useMode';
import { Character } from '../components/Character';
import { VRPlayer } from '../components/VRPlayer';
import { Model } from '../components/Model';
import { Vector3 } from 'three';
import { Coin } from '../components/gameDetails/Coin';
import { useCoins } from '../store/useCoins';
import { Platform } from '../components/gameDetails/Platform';

const vrD = 1.8;
const vrScale = new Vector3(vrD, vrD, vrD);
const scale = new Vector3(1, 1, 1);

const getPosition = (v: Vector3, isVr: boolean) => {
  if (isVr) {
    return new Vector3(v.x * vrD, v.y * vrD, v.z * vrD);
  }
  return v;
}

const platforms = [
  new Vector3(12, 1, 12),
  new Vector3(3, 2, 12),
  new Vector3(-6, 3, 12),
  new Vector3(-12, 4, 6),
  new Vector3(-12, 5, -3),
  new Vector3(-12, 6, -12),
  new Vector3(-3, 7, -12),
  new Vector3(6, 8, -12),
  new Vector3(12, 9, -6),
  new Vector3(12, 10, 3),
  new Vector3(3, 11, 3),
  new Vector3(-6, 12, 3),
  new Vector3(-6, 13, -6),
  new Vector3(3, 14, -6),
];

export const GameScene = ({isVr}: {isVr?: boolean}) => {
  const mode = useMode(s => s.mode);
  const coins = useCoins(s => s.coins);
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
      {platforms.map((p, i) => (
        <Platform key={i} position={p} />
      ))}
      {/* <Coin isVr={isVr} position={new Vector3(8, 1, 0)} /> */}
      {coins.map(c => (
        <Coin key={c.id} isVr={isVr} coinProps={c} />
      ))}
      
    </Physics>
  );
}
