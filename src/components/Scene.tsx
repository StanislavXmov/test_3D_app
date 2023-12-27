import { Physics } from '@react-three/rapier';
import { Ground } from '../level/Ground';
import { Character } from './Character';
import { DynamicPlatform } from '../level/DynamicPlatform';
import { Vector3 } from 'three';
import { Model } from '../level/Model';
import { Phase, useGame } from '../store/useGame';
import { PointerLevel } from '../level/pointer/PointerLevel';
import { PointerGameLevel } from '../level/pointer/PointerGameLevel';

export const Scene = () => {
  const phase = useGame(s => s.phase);

  return (
    <Physics timeStep="vary">
      {phase === Phase.build && <PointerLevel />}
      {phase === Phase.play && <PointerGameLevel />}
    </Physics>
  );
};
