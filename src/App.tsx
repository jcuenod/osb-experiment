import "./App.css";
import Waveform from "./Waveform";
import AudioButtons from "./AudioButtons";
import { AudioPlayerContextProvider } from "./AudioPlayerContext";
import ModalContent from "./ModalContent";
import { useState } from "react";

function App() {
  const [activeModalId, setActiveModalId] = useState("");
  return (
    <>
      <div
        style={{
          width: "640px",
          overflow: "hidden",
          border: "1px solid #aaa",
          borderRadius: "1rem",
          padding: "2rem 0",
        }}
      >
        <AudioPlayerContextProvider>
          <Waveform
            showModal={(id: string) => {
              setActiveModalId(id);
            }}
          />
          <div>
            <AudioButtons />
          </div>
        </AudioPlayerContextProvider>
      </div>
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
      </div>
    </>
  );
}

export default App;
