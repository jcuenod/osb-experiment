import { useContext, useEffect, useRef } from "react";
import { AudioPlayerContext } from "./AudioPlayerContext";
import { renderWaveformToCanvas } from "../util/drawWaveform";
import { DURATION_MULTIPLIER } from "../constants";
import { useGesture } from "@use-gesture/react";

let currentTimeAtDragStart = 0;

const handleTap = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  seek: (time: number) => void,
  duration: number
) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const percent = x / rect.width;
  seek(duration * percent);
};

interface WaveformProps {}
const Waveform: React.FC<WaveformProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { url, currentTime, duration, seek } = useContext(AudioPlayerContext);
  const bindDrag = useGesture(
    {
      onDrag: (state) => {
        if (state.tap) {
          handleTap(state.event, seek, duration);
          return;
        }
        const seekDiff = (state.movement[0] - 3) / DURATION_MULTIPLIER;
        seek(currentTimeAtDragStart - seekDiff);
      },
      onDragStart: (state) => {
        currentTimeAtDragStart = currentTime;
      },
    },
    { drag: { filterTaps: true } }
  );

  const width = duration * DURATION_MULTIPLIER;
  const leftPosition = (currentTime / duration) * width;

  useEffect(() => {
    if (!url) {
      // clear the canvas
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    const audioCtx = new AudioContext();
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    request.onload = async function () {
      const audioData = request.response;
      const audioBuffer = await audioCtx.decodeAudioData(audioData);
      const canvas = canvasRef.current;
      if (!canvas) return;
      renderWaveformToCanvas({
        canvas,
        buffer: audioBuffer,
        barWidth: 3,
        barSpacing: 2,
        color1: "rgb(168,85,247)",
        color2: "rgb(14,165,233)",
      });
    };
    request.send();
  }, [url]);

  return (
    <div style={{ position: "relative" }}>
      {/* this is a horizontal background line vertically centered behind the image */}
      <div
        style={{
          position: "absolute",
          top: "calc(50% - 3px)",
          height: "1px",
          width: "100%",
          backgroundColor: "#f1f5f9",
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
      <canvas
        style={{
          position: "relative",
          left: `50%`,
          transform: `translateX(-${leftPosition}px)`,
          transition: "transform 120ms ease",
          touchAction: "none",
        }}
        ref={canvasRef}
        width={`${width}px`}
        height="150px"
        {...bindDrag()}
      />
    </div>
  );
};

export default Waveform;
