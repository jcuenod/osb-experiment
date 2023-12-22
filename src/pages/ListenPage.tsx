import { IonContent, IonPage } from "@ionic/react";
import AudioButtons from "../components/AudioButtons";
import "./ListenPage.css";
import AudioSlider from "../components/AudioSlider";
import OsbHeader from "../components/OsbHeader";

interface ListenPageProps {
  setActiveStudyNoteId: (studyNoteId: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}
const ListenPage: React.FC<ListenPageProps> = ({
  setActiveStudyNoteId,
  setIsOpen,
}) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <OsbHeader page="Listen" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <AudioSlider
            onViewStudyNote={(studyNoteId: string) => {
              setActiveStudyNoteId(studyNoteId);
              setIsOpen(true);
            }}
          />
          <AudioButtons />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ListenPage;
