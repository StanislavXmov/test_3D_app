import { Physics, RigidBody } from '@react-three/rapier';
import { Character } from '../components/Character';

export const DefaultScene = () => {
  return (
    <Physics timeStep="vary">
      <Character />

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
