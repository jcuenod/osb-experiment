import { createContext, useContext, useEffect, useState } from "react";
import { PassageContext } from "./PassageContext";
import { LocalizationContext } from "./LocalizationContext";

interface LocalizedData {
  passageAudio: string | null;
  assets: Asset[];
  timestamps: Timestamp[];
}
const LocalizedDataContext = createContext<LocalizedData>({
  passageAudio: null,
  assets: [],
  timestamps: [],
});

const getImageUrl = (image: string) => {
  return `${import.meta.env.BASE_URL}${image}`;
};

const getLocalizedAudioUrl = (audio: string, languageCode: string) => {
  return `${import.meta.env.BASE_URL}localized/${languageCode}${audio}`;
};

const LocalizedDataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { passageId } = useContext(PassageContext);
  const { language } = useContext(LocalizationContext);
  const [localizedData, setLocalizedData] = useState<LocalizedData>({
    passageAudio: null,
    assets: [],
    timestamps: [],
  });

  useEffect(() => {
    if (!passageId || !language?.code) return;
    const localizedRoot =
      import.meta.env.BASE_URL + `localized/${language.code}`;
    const fetchLocalizedData = async () => {
      const response = await fetch(`${localizedRoot}/asset_manifest.json`);
      const data = await response.json();
      setLocalizedData({
        passageAudio: getLocalizedAudioUrl(data.passage_audio, language.code),
        assets: data.assets.map((asset: Asset) => ({
          ...asset,
          images: asset.images.map((image: string) => getImageUrl(image)),
          audio: getLocalizedAudioUrl(asset.audio, language.code),
        })),
        timestamps: data.timestamps,
      });
      console.log(data);
    };
    fetchLocalizedData();
  }, [passageId, language]);

  return (
    <LocalizedDataContext.Provider value={localizedData}>
      {children}
    </LocalizedDataContext.Provider>
  );
};

export { LocalizedDataContext, LocalizedDataContextProvider };
