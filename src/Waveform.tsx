import { useContext } from "react";
import waveformImg from "./assets/waveform.png";
import { AudioContext } from "./AudioContext";
import TimestampedActionButtons from "./TimestampedActionButtons";

const getWidthOfWaveform = () => {
  const img = new Image();
  img.src = waveformImg;
  return img.width;
};

function Waveform() {
  const { currentTime, duration, seek } = useContext(AudioContext);

  const width = getWidthOfWaveform();

  const leftPosition = (currentTime / duration) * width;
  return (
    <>
      <div style={{ position: "relative" }}>
        <TimestampedActionButtons
          leftPosition={leftPosition}
          width={getWidthOfWaveform()}
        />
      </div>
      <div style={{ position: "relative" }}>
        {/* this is a horizontal background line vertically centered behind the image */}
        <div
          style={{
            position: "absolute",
            top: "calc(50% - 4px)",
            height: "1px",
            width: "100%",
            backgroundColor: "#cbd5e1",
          }}
        />
        {/* This is a vertical red foreground line that marks the current timestamp (horizontally centered) */}
        <div
          style={{
            position: "absolute",
            left: `50%`,
            height: "100%",
            width: "1px",
            backgroundColor: "#f56565",
            zIndex: 1,
          }}
        />
        <img
          src={waveformImg}
          alt="waveform"
          style={{
            position: "relative",
            left: `50%`,
            transform: `translateX(-${leftPosition}px)`,
            transition: "transform 0.2s ease-in-out",
          }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left; //x position within the element.
            const percent = x / rect.width;
            console.log(percent);
            // seek to this percent of the duration
            seek(duration * percent);
          }}
        />
      </div>
    </>
  );
}

export default Waveform;
