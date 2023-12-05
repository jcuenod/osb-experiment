import { useContext } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import {
  play as playIcon,
  pause as pauseIcon,
  playBack,
  playForward,
} from "ionicons/icons";
import { AudioPlayerContext } from "../components/AudioPlayerContext";
import "./AudioButtons.css";

interface AudioButtonsProps {}
const AudioButtons: React.FC<AudioButtonsProps> = () => {
  const { play, seek, pause, paused, currentTime } =
    useContext(AudioPlayerContext);
  return (
    <div className="audio-button-container">
      <div className="audio-button-row">
        {/* skip backwards */}
        <IonButton className="circle" onClick={() => seek(currentTime - 5)}>
          <IonIcon slot="icon-only" icon={playBack}></IonIcon>
        </IonButton>
        {/* play */}
        {paused ? (
          <IonButton size="large" className="circle" onClick={play}>
            <IonIcon slot="icon-only" icon={playIcon}></IonIcon>
          </IonButton>
        ) : (
          <IonButton size="large" className="circle" onClick={pause}>
            <IonIcon slot="icon-only" icon={pauseIcon}></IonIcon>
          </IonButton>
        )}
        {/* skip forwards */}
        <IonButton className="circle" onClick={() => seek(currentTime + 5)}>
          <IonIcon slot="icon-only" icon={playForward}></IonIcon>
        </IonButton>
      </div>
    </div>
  );
};

export default AudioButtons;
