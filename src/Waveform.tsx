import { useContext, useEffect, useRef } from "react";
import { AudioPlayerContext } from "./AudioPlayerContext";
import TimestampedActionButtons from "./TimestampedActionButtons";
import renderToCanvas from "./drawWaveform";

const DURATION_MULTIPLIER = 15;

function Waveform({ showModal }: { showModal: (id: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { url, currentTime, duration, seek } = useContext(AudioPlayerContext);

  const width = duration * DURATION_MULTIPLIER;
  const leftPosition = (currentTime / duration) * width;

  useEffect(() => {
    //Use xmlhttprequest to get the audio file
    const audioCtx = new AudioContext();
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    request.onload = async function () {
      console.log("loaded");
      const audioData = request.response;
      const audioBuffer = await audioCtx.decodeAudioData(audioData);
      // Use renderSvg from draw-wave to render the waveform
      // const waveSVG = renderSvg(audioBuffer, 100, 300, "#52F6A4");
      // waveSVG is a dom node
      // setWaveString(waveSVG.outerHTML);
      const canvas = canvasRef.current;
      if (!canvas) return;
      console.log(canvas);
      renderToCanvas({
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
    <>
      <div style={{ position: "relative" }}>
        <TimestampedActionButtons
          leftPosition={leftPosition}
          width={width}
          showModal={showModal}
        />
      </div>
      <div style={{ position: "relative" }}>
        {/* this is a horizontal background line vertically centered behind the image */}
        <div
          style={{
            position: "absolute",
            top: "calc(50% - 5px)",
            height: "2px",
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
            transition: "transform 0.2s ease-in-out",
          }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left; //x position within the element.
            const percent = x / rect.width;
            // seek to this percent of the duration
            seek(duration * percent);
          }}
          ref={canvasRef}
          width={`${width}px`}
          height="150px"
        />
        {/* <img
          src={waveformImg}
        /> */}
      </div>
    </>
  );
}

export default Waveform;
