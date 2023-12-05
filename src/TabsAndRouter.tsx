import { Redirect, Route } from "react-router-dom";
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
import ResourcesPage from "./pages/ResourcesPage";
import ListenPage from "./pages/ListenPage";
import { AudioPlayerContext } from "./components/AudioPlayerContext";
import { useContext, useState } from "react";
import StudyNoteModal from "./components/StudyNoteModal";

const getAbsolutePath = (relativePath: string) => {
  return `${import.meta.env.BASE_URL}${relativePath}`;
};

const TabsAndRouter: React.FC = () => {
  const { pause } = useContext(AudioPlayerContext);

  const [activeStudyNoteId, setActiveStudyNoteId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <IonReactRouter>
      <IonTabs
        onIonTabsWillChange={() => {
          pause();
        }}
      >
        <IonRouterOutlet>
          <Route exact path={getAbsolutePath("contents")}>
            <ResourcesPage
              setActiveStudyNoteId={setActiveStudyNoteId}
              setIsOpen={setIsOpen}
            />
          </Route>
          <Route exact path={getAbsolutePath("listen")}>
            <ListenPage
              setActiveStudyNoteId={setActiveStudyNoteId}
              setIsOpen={setIsOpen}
            />
          </Route>
          {/* <Route path="/tab3">
        <Tab3 />
      </Route> */}
          <Route exact path="/">
            <Redirect to={getAbsolutePath("contents")} />
          </Route>
          <Route exact path={import.meta.env.BASE_URL}>
            <Redirect to={getAbsolutePath("contents")} />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="contents" href={getAbsolutePath("contents")}>
            <IonIcon aria-hidden="true" icon={apps} />
            <IonLabel>Contents</IonLabel>
          </IonTabButton>
          <IonTabButton tab="listen" href={getAbsolutePath("listen")}>
            <IonIcon aria-hidden="true" icon={playCircle} />
            <IonLabel>Listen</IonLabel>
          </IonTabButton>
          {/* <IonTabButton tab="tab3" href="/tab3">
        <IonIcon aria-hidden="true" icon={square} />
        <IonLabel>Tab 3</IonLabel>
      </IonTabButton> */}
        </IonTabBar>
      </IonTabs>
      <StudyNoteModal
        activeStudyNoteId={activeStudyNoteId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </IonReactRouter>
  );
};

export default TabsAndRouter;
