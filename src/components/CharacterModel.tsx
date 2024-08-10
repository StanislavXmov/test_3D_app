import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Bone, MeshStandardMaterial, SkinnedMesh } from 'three';

// interface CharacterGLTF extends GLTF {
//   nodes: {
//     mixamorigHips: Bone;
//     Cube: SkinnedMesh;
//   }
//   materials: {
//     'Material.004': MeshStandardMaterial;
//   }
// };

interface CharacterGLTF extends GLTF {
  nodes: {
    mixamorigHips: Bone;
    Cube: SkinnedMesh;
  }
  materials: {
    'Material.001': MeshStandardMaterial;
  }
};

// fpv material
const transparentMaterial = new MeshStandardMaterial({transparent: true, opacity: 0});

export const CharacterModel = () => {
  // const model = useGLTF('./character_model.glb') as unknown as CharacterGLTF;
  const model = useGLTF('./xmov.glb') as unknown as CharacterGLTF;

  // console.log(model);
  
  
  return (
    <group dispose={null} userData={{type: 'player'}} >
      <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01} position={[0, -0.9, 0]}>
        <primitive object={model.nodes.mixamorigHips} />
        {/* <skinnedMesh 
          castShadow 
          name="Cube" 
          frustumCulled={false} 
          geometry={model.nodes.Cube.geometry} 
          material={model.materials['Material.004']} 
          // material={transparentMaterial}
          skeleton={model.nodes.Cube.skeleton} 
        /> */}
        <skinnedMesh 
          castShadow 
          name="Cube" 
          frustumCulled={false} 
          geometry={model.nodes.Cube.geometry} 
          material={model.materials['Material.001']} 
          // material={transparentMaterial}
          skeleton={model.nodes.Cube.skeleton} 
        />
      </group>
    </group>
  );
};

// useGLTF.preload('./character_model.glb');
useGLTF.preload('./xmov.glb');
