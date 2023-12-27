import { Environment as Env } from '@react-three/drei';
import { Light } from './Light';

export const Environment = () => {
  return (
    <>
      <Env
        files="./test.hdr"
        background
        blur={0.5}
      />
      <Light />
    </>
  )
}
