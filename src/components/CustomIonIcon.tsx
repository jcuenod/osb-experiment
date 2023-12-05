import { IonIcon } from "@ionic/react";
import React from "react";

const iconTypes = {
  concept: import.meta.env.BASE_URL + "/heroicons/light-bulb.svg",
  image: import.meta.env.BASE_URL + "/heroicons/image.svg",
  location: import.meta.env.BASE_URL + "/heroicons/map-pin.svg",
  error: import.meta.env.BASE_URL + "/heroicons/exclamation-triangle.svg",
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
