import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonModal,
  IonIcon,
} from "@ionic/react";
import { LocalizedDataContext } from "./LocalizedDataContext";
import { close } from "ionicons/icons";
import { Switch, Case } from "./SwitchCase";
import { register } from "swiper/element/bundle";
import { useContext } from "react";
register();

// const getAbsolutePath = (relativePath: string) => {
//   return `${import.meta.env.BASE_URL}${relativePath}`;
// };

type StudyNoteModalProps = {
  activeStudyNoteId: string;
  isOpen: boolean;
  onClose: () => void;
};
const StudyNoteModal: React.FC<StudyNoteModalProps> = ({
  activeStudyNoteId,
  isOpen,
  onClose,
}) => {
  const { assets } = useContext(LocalizedDataContext);
  const content = assets.find((asset) => asset.id === activeStudyNoteId);

  const { title, images, audio } = {
    title: "Not Found",
    images: [],
    audio: "",
    ...content,
  };

  return (
    <IonModal isOpen={isOpen} onWillDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon slot="icon-only" icon={close}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <style>
          {`
            .swiper-slide-active {
                display: flex;
                justify-content: center;
                align-items: center;
            }
          `}
        </style>
        {/* slider of images */}
        <Switch>
          <Case test={images?.length > 1}>
            <swiper-container
              slides-per-view="1"
              css-mode={false}
              pagination={true}
            >
              {images.map((url: string) => (
                <swiper-slide key={url}>
                  <img
                    src={url}
                    alt={title}
                    style={{ maxHeight: "60vh", maxWidth: "80vw" }}
                  />
                </swiper-slide>
              ))}
            </swiper-container>
          </Case>
          <Case test={images?.length === 1}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={images[0]}
                alt={title}
                style={{ maxHeight: "60vh", maxWidth: "80vw" }}
              />
            </div>
          </Case>
        </Switch>
        {/* audio */}
        {audio && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {audio ? <audio controls src={audio} /> : null}
          </div>
        )}
      </IonContent>
    </IonModal>
  );
};

export default StudyNoteModal;
