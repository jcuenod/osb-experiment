import { createContext, useState } from "react";

type Language = {
  code: string;
  flag: string;
};

const AVAILABLE_LANGUAGES = [
  { code: "en", flag: "🇬🇧" },
  { code: "hi", flag: "🇮🇳" },
];

const LocalizationContext = createContext({
  language: AVAILABLE_LANGUAGES[0],
  available_languages: AVAILABLE_LANGUAGES,
  setLanguage: (language: string) => {},
});

const LocalizationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>(AVAILABLE_LANGUAGES[0]);

  const controlledSetLanguage = (language: string) => {
    const newActiveLanguage = AVAILABLE_LANGUAGES.find(
      (l) => l.code === language
    );
    if (newActiveLanguage) {
      setLanguage({ ...newActiveLanguage });
    }
  };

  return (
    <LocalizationContext.Provider
      value={{
        language,
        available_languages: AVAILABLE_LANGUAGES,
        setLanguage: controlledSetLanguage,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export { LocalizationContext, LocalizationContextProvider };
