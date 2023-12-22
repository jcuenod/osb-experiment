import { useContext } from "react";
import { AudioPlayerContext } from "./AudioPlayerContext";
import { DURATION_MULTIPLIER } from "../constants";
import buttons from "../assets/john6v1-15.processed.json";
import SliderButton from "./SliderButton";

const getLeftRelativeToWidth = (
  start: number,
  duration: number,
  width: number
) => {
  return (start / duration) * width;
};

interface StudyNoteButtonsProps {
  onViewStudyNote: (studyNoteId: string) => void;
}
const StudyNoteButtons: React.FC<StudyNoteButtonsProps> = ({
  onViewStudyNote,
}) => {
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
      {buttons.map((button, i) => (
        <SliderButton
          key={i}
          left={getLeftRelativeToWidth(button.start, duration, width) || 0}
          type={button.type as "map" | "image" | "concept" | "error"}
          onClick={() => {
            onViewStudyNote(button.id);
            pause();
          }}
          active={
            currentTime >= button.start - 0.5 && currentTime <= button.end + 0.5
          }
        />
      ))}
    </div>
  );
};

export default StudyNoteButtons;
