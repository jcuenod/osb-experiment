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
    </IonContent>
  );
};

export default ResourcesList;
