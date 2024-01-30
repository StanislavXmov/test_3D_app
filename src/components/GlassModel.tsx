import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { DoubleSide, Euler, Material, MeshPhysicalMaterial, MeshStandardMaterial, Vector3 } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type ModelProps = {
  url: string;
  nodeName: string;
  position?: Vector3;
  rotation?: Vector3;
  scale?: Vector3;
  isVr?: boolean;
};

interface Model3d extends GLTF {
  nodes: any;
  materials: any;
}

const config = {
  meshPhysicalMaterial: false,
  transmissionSampler: false,
  backside: false,
  samples: 1,
  resolution: 2048,
  transmission: 1,
  roughness: 0,
  thickness: 0,
  ior: 1.5,
  chromaticAberration: 0.06,
  anisotropy: 0.1,
  distortion: 0.0,
  distortionScale: 0.3,
  temporalDistortion: 0.5,
  clearcoat: 1,
  attenuationDistance: 0.5,
  attenuationColor: '#ffffff',
  color: '#b5dbd8',
  bg: '#ffffff'
};

const params = {
  color: 0xffffff,
  transmission: 1,
  opacity: 1,
  metalness: 0,
  roughness: 0,
  ior: 1.5,
  thickness: 0.01,
  specularIntensity: 1,
  specularColor: 0xffffff,
  envMapIntensity: 1,
  lightIntensity: 1,
  exposure: 1
};

const material = new MeshPhysicalMaterial( {
  color: params.color,
  metalness: params.metalness,
  roughness: params.roughness,
  ior: params.ior,
  envMapIntensity: 0,
  transmission: 0.8,
  specularIntensity: params.specularIntensity,
  specularColor: params.specularColor,
  opacity: params.opacity,
  side: DoubleSide,
  transparent: true
});

const standartMaterial = new MeshStandardMaterial({
  transparent: true,
  opacity: 0.5,
  color: '#9DCFCC'
});

const transmissionMaterial = <MeshTransmissionMaterial transmissionSampler {...config} />;

const GlassModel = ({
  url,
  nodeName,
  position = new Vector3(),
  rotation = new Vector3(),
  scale = new Vector3(1, 1, 1),
  isVr,
}: ModelProps) => {
  const {nodes, materials} = useGLTF(url) as unknown as Model3d;
  
  return (
    <group dispose={null}>
      <group>
        {!isVr && (
          <mesh 
            castShadow 
            receiveShadow 
            geometry={nodes[nodeName].geometry} 
            scale={scale}
            position={position}
            rotation={new Euler().setFromVector3(rotation)}
          >
            {transmissionMaterial}
          </mesh>
        )}
        {isVr && (
          <mesh 
            castShadow 
            receiveShadow 
            geometry={nodes[nodeName].geometry}
            material={standartMaterial}
            scale={scale}
            position={position}
            rotation={new Euler().setFromVector3(rotation)}
          />
        )}
      </group>
    </group>
  );
}

export default GlassModel;