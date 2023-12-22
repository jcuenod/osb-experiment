import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPopover,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { LocalizationContext } from "./LocalizationContext";
import { useContext, useRef, useState } from "react";

interface OsbHeaderProps {
  page: string;
}
const OsbHeader = ({ page }: OsbHeaderProps) => {
  const popover = useRef<HTMLIonPopoverElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { available_languages, language, setLanguage } =
    useContext(LocalizationContext);

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="primary">
          <IonButton onClick={() => setPopoverOpen(true)}>
            <span role="img" aria-label="english flag">
              {language.code} {language.flag}
            </span>
          </IonButton>
          <IonPopover
            ref={popover}
            isOpen={popoverOpen}
            onDidDismiss={() => setPopoverOpen(false)}
            keepContentsMounted={false}
          >
            <IonContent class="ion-padding">
              {available_languages.map((l) => (
                <div key={l.code}>
                  <IonButton
                    fill="clear"
                    onClick={() => {
                      setLanguage(l.code);
                      setPopoverOpen(false);
                    }}
                  >
                    {l.code} {l.flag}
                  </IonButton>
                </div>
              ))}
            </IonContent>
          </IonPopover>
        </IonButtons>
        <IonTitle>{page}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default OsbHeader;
