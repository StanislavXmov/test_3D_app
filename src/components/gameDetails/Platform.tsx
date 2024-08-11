import { RigidBody } from "@react-three/rapier";
import { Vector3 } from "three";

export const Platform = ({position}: {position: Vector3}) => {
  return (
    <RigidBody 
        type="fixed" 
        colliders="trimesh"
        position={position} 
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[6, 0.5, 6]} />
          <meshStandardMaterial color={'#72bdc7'} />
        </mesh>
      </RigidBody>
  );
}
