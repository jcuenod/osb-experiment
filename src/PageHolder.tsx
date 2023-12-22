// One day we will host this somewhere and can use actual URLs, in the meantime, we use this placeholder to extract the page from the query string and render the appropriate page.
import ResourcesPage from "./pages/ResourcesPage";
import ListenPage from "./pages/ListenPage";
import { useEffect, useState } from "react";

interface PageHolderProps {
  setActiveStudyNoteId: (studyNoteId: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}
const PageHolder = ({ setActiveStudyNoteId, setIsOpen }: PageHolderProps) => {
  // watch the # in the url and set the currentTab accordingly
  const [currentTab, setCurrentTab] = useState<string>("contents");
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    setCurrentTab(hash);
  }, [window.location.hash]);

  switch (currentTab) {
    case "contents":
      return (
        <ResourcesPage
          setActiveStudyNoteId={setActiveStudyNoteId}
          setIsOpen={setIsOpen}
        />
      );
    case "listen":
      return (
        <ListenPage
          setActiveStudyNoteId={setActiveStudyNoteId}
          setIsOpen={setIsOpen}
        />
      );
    default:
      return (
        <ResourcesPage
          setActiveStudyNoteId={setActiveStudyNoteId}
          setIsOpen={setIsOpen}
        />
      );
  }
};

export default PageHolder;
