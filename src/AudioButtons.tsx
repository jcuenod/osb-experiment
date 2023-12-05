import { useContext } from "react";
import { AudioPlayerContext } from "./AudioPlayerContext";

const buttonStyle = {
  padding: "0.3rem 0.3rem",
  margin: "0 0.3rem",
  borderRadius: "50%",
  backgroundColor: "#e2e8f0",
  color: "#334155",
  cursor: "pointer",
  aspectRatio: "1/1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "background-color 0.1s ease-in-out, color 0.1s ease-in-out",
};

const bigButtonStyle = {
  ...buttonStyle,
  width: "4rem",
  height: "4rem",
};
const smallButtonStyle = {
  ...buttonStyle,
  width: "2rem",
  height: "2rem",
};

const PlayIcon = (size: string) =>
  (
    <span
      style={{
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: size }}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
        />
      </svg>
    </span>
  ) as JSX.Element;
const PauseIcon = (size: string) =>
  (
    <span
      style={{
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        style={{ width: size }}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 5.25v13.5m-7.5-13.5v13.5"
        />
      </svg>
    </span>
  ) as JSX.Element;
const SeekForwardIcon = (size: string) =>
  (
    <span
      style={{
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: size }}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
        />
      </svg>
    </span>
  ) as JSX.Element;
const SeekBackIcon = (size: string) =>
  (
    <span
      style={{
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: size }}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
        />
      </svg>
    </span>
  ) as JSX.Element;

type PlayPauseButtonProps = {
  icon: JSX.Element;
  onClick: () => void;
};
const PlayPauseButton = ({ icon, onClick }: PlayPauseButtonProps) => (
  <button style={bigButtonStyle} onClick={onClick} className="audio-button">
    {icon}
  </button>
);

const SeekButton = ({ icon, onClick }: PlayPauseButtonProps) => (
  <button style={smallButtonStyle} onClick={onClick} className="audio-button">
    {icon}
  </button>
);

function AudioButtons() {
  const { paused, play, pause, seek, currentTime } =
    useContext(AudioPlayerContext);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      <style>
        {`
            .audio-button:hover {
                background-color: #cbd5e1 !important;
            }
            .audio-button:active {
                background-color: #1e3a8a !important;
                color: #cbd5e1 !important;
            }
        `}
      </style>
      <SeekButton
        icon={SeekBackIcon("1.5rem")}
        onClick={() => seek(currentTime - 5)}
      />
      {paused ? (
        <PlayPauseButton icon={PlayIcon("2.5rem")} onClick={() => play()} />
      ) : (
        <PlayPauseButton icon={PauseIcon("2.5rem")} onClick={() => pause()} />
      )}
      <SeekButton
        icon={SeekForwardIcon("1.5rem")}
        onClick={() => seek(currentTime + 5)}
      />
    </div>
  );
}
export default AudioButtons;
