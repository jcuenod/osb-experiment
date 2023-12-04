import { useEffect, useRef, useState } from "react";
import { createContext } from "react";

const AudioContext = createContext({
  currentTime: 0,
  duration: 0,
  paused: true,
  play: Function.prototype,
  pause: Function.prototype,
  seek: Function.prototype,
});

type AudioContextProps = {
  children: React.ReactNode;
};
function AudioContextProvider({ children }: AudioContextProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

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
    <AudioContext.Provider
      value={{
        currentTime,
        duration,
        paused,
        play: () => {
          console.log("play");
          const audio = audioRef.current;
          if (!audio) return;
          audio.play();
        },
        pause: () => {
          console.log("pause");
          const audio = audioRef.current;
          if (!audio) return;
          audio.pause();
        },
        seek: (time: number) => {
          console.log("seeking to", time);
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
      <audio src="/john6v1-15.mp3" ref={audioRef} />
      {children}
    </AudioContext.Provider>
  );
}

export { AudioContext, AudioContextProvider };
