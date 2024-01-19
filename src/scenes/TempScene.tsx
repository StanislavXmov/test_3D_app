import { Physics, RigidBody } from '@react-three/rapier';
import { Mods, useMode } from '../store/useMode';
import { Character } from '../components/Character';
import { VRPlayer } from '../components/VRPlayer';
import { Model } from '../components/Model';
import { Vector3 } from 'three';

const vrD = 1.8;
const vrScale = new Vector3(vrD, vrD, vrD);
const scale = new Vector3(1, 1, 1);

const getPosition = (v: Vector3, isVr: boolean) => {
  if (isVr) {
    return new Vector3(v.x * vrD, v.y * vrD, v.z * vrD);
  }
  return v;
}

export const TempScene = ({isVr}: {isVr?: boolean}) => {
  const mode = useMode(s => s.mode);
  const width = isVr ? 32 * vrD : 32;

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
        position={[0, -0.5, 0]} 
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[width, 1, width]} />
          <meshStandardMaterial color={'#2e2e2e'} />
        </mesh>
      </RigidBody>
      <Model
        position={getPosition(new Vector3(1.5, 0, -3.5), isVr)}
        materialName=''
        nodeName='collider'
        rigidBody={true}
        url='./cube.glb'
        scale={isVr ? vrScale : scale}
      />
      <Model
        position={getPosition(new Vector3(-3, 0, -1), isVr)}
        materialName=''
        nodeName='collider'
        rigidBody={true}
        url='./cube1.glb'
        scale={isVr ? vrScale : scale}
      />
      <Model
        position={getPosition(new Vector3(-3, 2, -6), isVr)}
        materialName=''
        nodeName='collider'
        rigidBody={true}
        url='./cube1.glb'
        scale={isVr ? vrScale : scale}
      />
      <Model
        position={getPosition(new Vector3(-3, 2, -8), isVr)}
        materialName=''
        nodeName='collider'
        rigidBody={true}
        url='./cube1.glb'
        scale={isVr ? vrScale : scale}
      />
      <Model
        position={getPosition(new Vector3(-3, 0, -2), isVr)}
        materialName=''
        nodeName='collider'
        rigidBody={true}
        url='./cube2.glb'
        scale={isVr ? vrScale : scale}
      />
      <Model
        position={new Vector3(0, 0, -10)}
        materialName='Material.004'
        nodeName='Cube'
        rigidBody={false}
        url='./character_model.glb'
        scale={isVr ? vrScale : scale}
      />
    </Physics>
  );
}
