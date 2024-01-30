import { Physics, RigidBody } from '@react-three/rapier';
import { Mods, useMode } from '../store/useMode';
import { Character } from '../components/Character';
import { VRPlayer } from '../components/VRPlayer';
import { Model } from '../components/Model';
import { Vector3 } from 'three';
import GlassModel from '../components/GlassModel';

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
      <Model
        position={getPosition(new Vector3(1.5, 0, -3), isVr)}
        materialName=''
        nodeName='mesh'
        rigidBody={true}
        url='./mesh0.glb'
        scale={isVr ? vrScale : scale}
      />
      <Model
        position={getPosition(new Vector3(1.5, 0, -3), isVr)}
        materialName=''
        nodeName='mesh'
        rigidBody={true}
        url='./mesh1.glb'
        scale={isVr ? vrScale : scale}
      />
      <Model
        position={getPosition(new Vector3(1.5, 0, -3), isVr)}
        materialName=''
        nodeName='mesh'
        rigidBody={true}
        url='./mesh2.glb'
        scale={isVr ? vrScale : scale}
      />
      <Model
        position={getPosition(new Vector3(1.5, 0, -3), isVr)}
        materialName=''
        nodeName='env'
        rigidBody={false}
        url='./env_models.glb'
        scale={isVr ? vrScale : scale}
      />
      <GlassModel
        position={getPosition(new Vector3(1.5, 0, -3), isVr)}
        nodeName='glass'
        url='./glass.glb'
        scale={isVr ? vrScale : scale}
        isVr={isVr}
      />
    </Physics>
  );
}
