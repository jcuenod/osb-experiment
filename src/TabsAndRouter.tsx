import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { apps, playCircle } from "ionicons/icons";
import { AudioPlayerContext } from "./components/AudioPlayerContext";
import { useContext, useState } from "react";
import { AudioPlayerContextProvider } from "./components/AudioPlayerContext";
import StudyNoteModal from "./components/StudyNoteModal";
import PageHolder from "./PageHolder";
import { LocalizedDataContextProvider } from "./components/LocalizedDataContext";

const TabsAndRouter: React.FC = () => {
  const { pause } = useContext(AudioPlayerContext);

  const [activeStudyNoteId, setActiveStudyNoteId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <LocalizedDataContextProvider>
        <AudioPlayerContextProvider>
          <IonReactRouter>
            <IonTabs
              onIonTabsDidChange={() => {
                pause();
              }}
            >
              <IonRouterOutlet>
                <PageHolder
                  setActiveStudyNoteId={setActiveStudyNoteId}
                  setIsOpen={setIsOpen}
                />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="contents" href="#contents">
                  <IonIcon aria-hidden="true" icon={apps} />
                  <IonLabel>Contents</IonLabel>
                </IonTabButton>
                <IonTabButton tab="listen" href="#listen">
                  <IonIcon aria-hidden="true" icon={playCircle} />
                  <IonLabel>Listen</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
            <StudyNoteModal
              activeStudyNoteId={activeStudyNoteId}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            />
          </IonReactRouter>
        </AudioPlayerContextProvider>
      </LocalizedDataContextProvider>
    </>
  );
};

export default TabsAndRouter;
