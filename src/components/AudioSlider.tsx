import StudyNoteButtons from "./StudyNoteButtons";
import Waveform from "./Waveform";

interface AudioSliderProps {
  onViewStudyNote: (studyNoteId: string) => void;
}
const AudioSlider: React.FC<AudioSliderProps> = ({ onViewStudyNote }) => {
  return (
    <div>
      <StudyNoteButtons onViewStudyNote={onViewStudyNote} />
      <Waveform />
    </div>
  );
};

export default AudioSlider;
