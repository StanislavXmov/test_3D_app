import { EcctrlJoystick } from "ecctrl";
import { MeshStandardMaterial } from "three"

export const Joystick = () => {
  return (
    <EcctrlJoystick 
      joystickBaseProps={{
        receiveShadow: true,
        material: new MeshStandardMaterial({ color: "white" }),
      }}
      joystickStickProps={{
        receiveShadow: true,
        material: new MeshStandardMaterial({ color: "grey" }),
      }}
      joystickHandleProps={{
        receiveShadow: true,
        material: new MeshStandardMaterial({ color: "black" }),
      }}
      buttonLargeBaseProps={{
        receiveShadow: true,
        material: new MeshStandardMaterial({ color: "white" }),
      }}
      buttonTop1Props={{
        receiveShadow: true,
        material: new MeshStandardMaterial({ color: "black" }),
      }}
    >
      <ambientLight intensity={0.5} />
    </EcctrlJoystick>
  );
}
