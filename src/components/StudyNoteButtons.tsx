import { useContext } from "react";
import { AudioPlayerContext } from "./AudioPlayerContext";
import { DURATION_MULTIPLIER } from "../constants";
import SliderButton from "./SliderButton";
import { LocalizedDataContext } from "./LocalizedDataContext";

const getLeftRelativeToWidth = (
  start: number,
  duration: number,
  width: number
) => {
  return (start / duration) * width;
};

const getAssetType = (id: string, assets: Asset[]) => {
  const asset = assets.find((asset) => asset.id === id);
  return asset?.type;
};

interface StudyNoteButtonsProps {
  onViewStudyNote: (studyNoteId: string) => void;
}
const StudyNoteButtons: React.FC<StudyNoteButtonsProps> = ({
  onViewStudyNote,
}) => {
  const { timestamps, assets } = useContext(LocalizedDataContext);
  const { url, currentTime, duration, seek, pause } =
    useContext(AudioPlayerContext);

  const width = duration * DURATION_MULTIPLIER;
  const leftPosition = (currentTime / duration) * width;
  return (
    <div
      style={{
        position: "relative",
        height: "5rem",
        marginTop: "2rem",
        left: `50%`,
        transform: `translateX(-${leftPosition}px)`,
        transition: "transform 0.2s ease-in-out",
      }}
    >
      {timestamps.map((timestamp, i) => (
        <SliderButton
          key={i}
          left={getLeftRelativeToWidth(timestamp.start, duration, width) || 0}
          type={
            getAssetType(timestamp.id, assets) as
              | "map"
              | "image"
              | "concept"
              | "error"
          }
          onClick={() => {
            onViewStudyNote(timestamp.id);
            pause();
          }}
          active={
            currentTime >= timestamp.start - 0.5 &&
            currentTime <= timestamp.end + 0.5
          }
        />
      ))}
    </div>
  );
};

export default StudyNoteButtons;
