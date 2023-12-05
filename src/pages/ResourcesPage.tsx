import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ContentsList from "../components/ContentsList";
import "./ResourcesPage.css";

interface ResourcesPageProps {
  setActiveStudyNoteId: (studyNoteId: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}
const ResourcesPage: React.FC<ResourcesPageProps> = ({
  setActiveStudyNoteId,
  setIsOpen,
}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contents</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Contents</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ContentsList
          setActiveStudyNoteId={setActiveStudyNoteId}
          setIsOpen={setIsOpen}
        />
      </IonContent>
    </IonPage>
  );
};

export default ResourcesPage;
