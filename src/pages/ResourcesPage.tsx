import { IonContent, IonPage } from "@ionic/react";
import ContentsList from "../components/ContentsList";
import OsbHeader from "../components/OsbHeader";
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
      <IonContent fullscreen color="light">
        <OsbHeader page="Contents" />
        <ContentsList
          setActiveStudyNoteId={setActiveStudyNoteId}
          setIsOpen={setIsOpen}
        />
      </IonContent>
    </IonPage>
  );
};

export default ResourcesPage;
