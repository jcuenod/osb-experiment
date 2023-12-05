import { IonIcon } from "@ionic/react";
import React from "react";

const iconTypes = {
  concept: "/heroicons/light-bulb.svg",
  image: "/heroicons/image.svg",
  location: "/heroicons/map-pin.svg",
  error: "/heroicons/exclamation-triangle.svg",
};

interface CustomIonIconProps {
  type: string;
}
const CustomIonIcon: React.FC<CustomIonIconProps> = ({ type }) => {
  const iconSrc =
    type in iconTypes
      ? iconTypes[type as keyof typeof iconTypes]
      : iconTypes["error"];

  return <IonIcon slot="icon-only" src={iconSrc}></IonIcon>;
};
export default CustomIonIcon;
