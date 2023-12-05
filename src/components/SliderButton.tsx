import { IonButton } from "@ionic/react";
import "./SliderButton.css";
import CustomIonIcon from "./CustomIonIcon";

type SliderButtonProps = {
  left: number;
  type: string;
  onClick: () => void;
  active?: boolean;
};
const SliderButton: React.FC<SliderButtonProps> = ({
  left,
  type,
  onClick,
  active,
}) => {
  return (
    <div style={{ left }} className="study-note-button-container">
      <IonButton
        size="large"
        className={"circle" + (active ? " active" : "")}
        onClick={onClick}
      >
        <CustomIonIcon type={type} />
      </IonButton>
    </div>
  );
};

export default SliderButton;
