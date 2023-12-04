import { useContext, useState } from "react";
import { AudioContext } from "./AudioContext";
import TimestampedActionButton from "./TimestampedActionButton";
import buttons from "./assets/john6v1-15.processed.json";
import { createPortal } from "react-dom";
import ModalContent from "./ModalContent";

const getLeftRelativeToWidth = (
  start: number,
  duration: number,
  width: number
) => {
  return (start / duration) * width;
};

function TimestampedActionButtons({
  leftPosition,
  width,
}: {
  leftPosition: number;
  width: number;
}) {
  const { duration, currentTime, pause } = useContext(AudioContext);
  const [activeModalId, setActiveModalId] = useState<string>("");
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
              setActiveModalId(button.id);
              pause();
            }}
            active={
              currentTime >= button.start - 0.5 &&
              currentTime <= button.end + 0.5
            }
          />
        ))}
      </div>
      {/* modal */}
      {createPortal(
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.5)",
            pointerEvents: activeModalId ? "auto" : "none",
            opacity: activeModalId ? 1 : 0,
            transform: `translateY(${activeModalId ? 0 : "5px"})`,
            transition:
              "opacity 0.2s ease-in-out, transform 0.2s ease-in-out, backdropFilter 0.2s ease-in-out",
            zIndex: 10,
            // blur the background
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflowY: "auto",
          }}
          onClick={() => {
            setActiveModalId("");
          }}
        >
          <ModalContent id={activeModalId} />
        </div>,
        document.body
      )}
    </>
  );
}

export default TimestampedActionButtons;
