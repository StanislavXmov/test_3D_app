import { Vector3 } from "three";
import { Model } from "../Model"
import { animated, useSpring } from "@react-spring/three";
import { useState } from "react";
import { CuboidCollider } from "@react-three/rapier";
import { useCoins, useCoinsStore, type Coin as CoinProps } from "../../store/useCoins";

const vrD = 1.8;
const vrScale = new Vector3(vrD, vrD, vrD);
const scale = new Vector3(1, 1, 1);

const getPosition = (v: Vector3, isVr: boolean) => {
  if (isVr) {
    return new Vector3(v.x * vrD, v.y * vrD, v.z * vrD);
  }
  return v;
}

export const Coin = ({isVr, coinProps}: {isVr?: boolean, coinProps: CoinProps}) => {
  const [isAlive, setIsAlive] = useState(true);
  const {position: {x, y, z}, id} = coinProps;
  
  const getCoin = useCoins(s => s.getCoin);
  const increase = useCoinsStore(s => s.increase);
  const [active, setActive] = useState(0);
  const { rotation } = useSpring({
    from: {
      rotation: 0,
    },
    to: [
      {rotation: - Math.PI / 2, delay: 0},
      {rotation: - Math.PI, delay: 0},
      {rotation: - Math.PI * 1.5, delay: 0},
      {rotation: - Math.PI * 2, delay: 0},
    ],
    config: {
      mass: 5,
      tension: 400,
      friction: 50,
      duration: 500,
    },
    loop: true,
    immediate: true,
  });
  const { spring } = useSpring({
    spring: active,
    config: {
      mass: 5,
      tension: 400,
      friction: 50,
      precision: 0.0001,
      duration: 500,
    },
    onRest: (e) => {
      if (e.finished === true) {
        getCoin(id);
        increase();
        setIsAlive(false);
      }
  },
  });
  const springYPosition = spring.to([0, 1], [y, y + 2]);
  const springScale = spring.to([0, 1], [1, 0.5]);

  if (!isAlive) {
    return null;
  }

  return (
    <>
      <CuboidCollider
        position={[x, y + 0.5, z]}
        args={[0.5, 0.5, 0.5]}
        sensor
        onIntersectionEnter={() => setActive(1)}
        // onIntersectionExit={() => console.log('exit')}
      />
      <animated.group
        position={[x, y, z]}
        rotation-y={rotation}
        scale={springScale}
        position-y={springYPosition}

      >
        <Model
          position={getPosition(new Vector3(0, 0, 0), isVr)}
          materialName='Material'
          nodeName='Circle'
          rigidBody={false}
          url='./coin.glb'
          scale={isVr ? vrScale : scale}
        />
      </animated.group>
    </>
  );
}
