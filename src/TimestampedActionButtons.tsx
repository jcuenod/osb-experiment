import { useContext } from "react";
import { AudioPlayerContext } from "./AudioPlayerContext";
import TimestampedActionButton from "./TimestampedActionButton";
import buttons from "./assets/john6v1-15.processed.json";

const getLeftRelativeToWidth = (
  start: number,
  duration: number,
  width: number
) => {
  return (start / duration) * width;
};

type TimestampedActionButtonsProps = {
  leftPosition: number;
  width: number;
  showModal: (id: string) => void;
};
function TimestampedActionButtons({
  leftPosition,
  width,
  showModal,
}: TimestampedActionButtonsProps) {
  const { duration, currentTime, pause } = useContext(AudioPlayerContext);
  return (
    <>
      <div
        style={{
          position: "relative",
          height: "5rem",
          width,
          left: `50%`,
          transform: `translateX(-${leftPosition}px)`,
          transition: "transform 0.2s ease-in-out",
        }}
      >
        {buttons.map((button, i) => (
          <TimestampedActionButton
            key={i}
            left={getLeftRelativeToWidth(button.start, duration, width) || 0}
            type={button.type as "location" | "image"}
            onClick={() => {
              showModal(button.id);
              pause();
            }}
            active={
              currentTime >= button.start - 0.5 &&
              currentTime <= button.end + 0.5
            }
          />
        ))}
      </div>
    </>
  );
}

export default TimestampedActionButtons;
