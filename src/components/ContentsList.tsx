import { IonButton, IonItem, IonLabel, IonList } from "@ionic/react";

import { LocalizedDataContext } from "./LocalizedDataContext";
import { useContext, useEffect, useState } from "react";
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
  const dataContext = useContext(LocalizedDataContext);
  const { assets, timestamps } = dataContext;

  const [items, setItems] = useState<Asset[]>([]);
  useEffect(() => {
    const orderedIds = timestamps
      .slice()
      .sort((a, b) => a.start - b.start)
      .map((ts) => ts.id);
    const orderedAssets = assets
      .filter((asset) => orderedIds.includes(asset.id))
      .sort((a, b) => {
        const aIndex = orderedIds.indexOf(a.id);
        const bIndex = orderedIds.indexOf(b.id);
        return aIndex - bIndex;
      });
    setItems(orderedAssets);
  }, [dataContext]);
  return (
    <>
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
    </>
  );
};

export default ResourcesList;
