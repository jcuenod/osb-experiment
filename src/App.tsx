import { IonApp, setupIonicReact } from "@ionic/react";
import TabsAndRouter from "./TabsAndRouter";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { AudioPlayerContextProvider } from "./components/AudioPlayerContext";

/* Theme variables */
import "./theme/variables.css";
import { useState } from "react";

setupIonicReact();

const App: React.FC = () => {
  const [audioSrc, setAudioSrc] = useState<string>(
    "/osb-experiment/john6v1-15.mp3"
  );
  return (
    <IonApp>
      <AudioPlayerContextProvider audioSrc={audioSrc}>
        <TabsAndRouter />
      </AudioPlayerContextProvider>
    </IonApp>
  );
};

export default App;
