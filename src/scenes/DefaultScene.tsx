import { Physics, RigidBody } from '@react-three/rapier';
import { Character } from '../components/Character';
import { Mods, useMode } from '../store/useMode';
import { VRPlayer } from '../components/VRPlayer';

export const DefaultScene = () => {
  const mode = useMode(s => s.mode);

  let gameController = <Character />;
  if (mode === Mods.vr) {
    gameController = <VRPlayer />;
  }
  
  return (
    <Physics timeStep="vary">
      {gameController}

      <RigidBody 
        type="fixed" 
        colliders="trimesh"
        position={[0, -1.5, 0]} 
      >
        <mesh>
          <boxGeometry args={[6, 1, 6]} />
          <meshStandardMaterial color={'#c1c1c1'} />
        </mesh>
      </RigidBody>
      <RigidBody 
        type="fixed" 
        colliders="trimesh"
        position={[8, -1.5, 0]} 
      >
        <mesh>
          <boxGeometry args={[6, 1, 6]} />
          <meshStandardMaterial color={'#c1c1c1'} />
        </mesh>
      </RigidBody>

    </Physics>
  );
}
