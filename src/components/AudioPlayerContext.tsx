import { useEffect, useRef, useState } from "react";
import { createContext } from "react";

const AudioPlayerContext = createContext({
  url: "",
  currentTime: 0,
  duration: 0,
  paused: true,
  play: () => {},
  pause: () => {},
  seek: (time: number) => {},
});

type AudioPlayerContextProps = {
  audioSrc: string;
  children: React.ReactNode;
};
function AudioPlayerContextProvider({
  audioSrc,
  children,
}: AudioPlayerContextProps) {
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
      <audio src={audioSrc} ref={audioRef} />
      {children}
    </AudioPlayerContext.Provider>
  );
}

export { AudioPlayerContext, AudioPlayerContextProvider };
