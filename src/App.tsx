import { useEffect, useState } from "react";

import "./App.css";
import Waveform from "./Waveform";
import AudioButtons from "./AudioButtons";
import { AudioContextProvider } from "./AudioContext";

function App() {
  return (
    <div
      style={{
        width: "640px",
        overflow: "hidden",
        border: "1px solid #aaa",
        borderRadius: "1rem",
        padding: "2rem 0",
      }}
    >
      <AudioContextProvider>
        <Waveform />
        <div>
          <AudioButtons />
        </div>
      </AudioContextProvider>
    </div>
  );
}

export default App;
