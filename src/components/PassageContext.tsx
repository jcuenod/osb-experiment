import { createContext, useEffect, useState } from "react";

const getAvailablePassages = async () => {
  return ["john_6_1_15"];
};

type PassageContextType = {
  passageId: string | null;
  setPassageId: (passageId: string) => void;
  getAvailablePassages: () => Promise<string[]>;
};

const PassageContext = createContext<PassageContextType>({
  passageId: null,
  setPassageId: (passageId: string) => {},
  getAvailablePassages,
});

const PassageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [passageId, setPassageId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPassageId = async () => {
      const availablePassages = await getAvailablePassages();
      setPassageId(availablePassages[0]);
    };
    fetchPassageId();
  }, []);

  return (
    <PassageContext.Provider
      value={{
        passageId,
        setPassageId,
        getAvailablePassages,
      }}
    >
      {children}
    </PassageContext.Provider>
  );
};

export { PassageContext, PassageContextProvider };
