import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import AudioButtons from "../components/AudioButtons";
import "./ListenPage.css";
import AudioSlider from "../components/AudioSlider";

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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Listen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Listen</IonTitle>
          </IonToolbar>
        </IonHeader>
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
