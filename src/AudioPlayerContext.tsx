import { useEffect, useRef, useState } from "react";
import { createContext } from "react";

import audio from "/john6v1-15.mp3";

const AudioPlayerContext = createContext({
  url: "",
  currentTime: 0,
  duration: 0,
  paused: true,
  play: Function.prototype,
  pause: Function.prototype,
  seek: Function.prototype,
});

type AudioPlayerContextProps = {
  children: React.ReactNode;
};
function AudioPlayerContextProvider({ children }: AudioPlayerContextProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(true);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setUrl(audio.src);

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("play", () => {
      setPaused(false);
    });
    audio.addEventListener("pause", () => {
      setPaused(true);
    });

    const timer = setInterval(() => {
      setCurrentTime(audio.currentTime);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        url,
        currentTime,
        duration,
        paused,
        play: () => {
          const audio = audioRef.current;
          if (!audio) return;
          audio.play();
        },
        pause: () => {
          const audio = audioRef.current;
          if (!audio) return;
          audio.pause();
        },
        seek: (time: number) => {
          const audio = audioRef.current;
          if (!audio) return;
          if (time < 0) {
            audio.currentTime = 0;
            return;
          }
          if (time > audio.duration) {
            audio.currentTime = audio.duration;
            return;
          }
          audio.currentTime = time;
        },
      }}
    >
      <audio src={audio} ref={audioRef} />
      {children}
    </AudioPlayerContext.Provider>
  );
}

export { AudioPlayerContext, AudioPlayerContextProvider };
