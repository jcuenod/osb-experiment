import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";

import buttons from "../assets/john6v1-15.processed.json";
import assetsManifest from "../assets/asset_manifest.json";
import { useEffect, useState } from "react";
import CustomIonIcon from "./CustomIonIcon";

type Asset = {
  id: string;
  title: string;
  type: string;
  images: string[];
  audio: string;
};

interface ResourcesListProps {
  setActiveStudyNoteId: (studyNoteId: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}
const ResourcesList: React.FC<ResourcesListProps> = ({
  setActiveStudyNoteId,
  setIsOpen,
}) => {
  const [items, setItems] = useState<Asset[]>([]);
  useEffect(() => {
    const orderedIds = buttons
      .slice()
      .sort((a, b) => a.start - b.start)
      .map((button) => button.id);
    const orderedAssets = assetsManifest.assets
      .filter((asset) => orderedIds.includes(asset.id))
      .sort((a, b) => {
        const aIndex = orderedIds.indexOf(a.id);
        const bIndex = orderedIds.indexOf(b.id);
        return aIndex - bIndex;
      });
    setItems(orderedAssets);
  }, []);
  return (
    <IonContent color="light">
      <IonList inset={true}>
        {items.map((item) => (
          <IonItem key={item.id}>
            <IonLabel>{item.title}</IonLabel>
            <IonButton
              onClick={() => {
                setActiveStudyNoteId(item.id);
                setIsOpen(true);
              }}
            >
              <CustomIonIcon type={item.type} />
            </IonButton>
          </IonItem>
        ))}
        {/* <IonItem>
          <IonLabel>Mega Man X</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>The Legend of Zelda</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Pac-Man</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Super Mario World</IonLabel>
        </IonItem> */}
      </IonList>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: "400px" }}>
          <p>
            <b>Please Note: </b>
            This is a limited preview. It demonstrates a single pericope (John
            6:1–15) with partial tagging and only a sample of enhanced
            resources. The current pane is an overview of the contents of this
            pericope.
          </p>
          <p>
            Click <b>Listen</b> below for a demonstration of the audio study
            notes.
          </p>
        </div>
      </div>
    </IonContent>
  );
};

export default ResourcesList;
