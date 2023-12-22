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
    setCurrentTab(["contents", "listen"].includes(hash) ? hash : "contents");
  }, [window.location.hash]);

  return (
    <>
      <div style={currentTab === "contents" ? {} : { display: "none" }}>
        <ResourcesPage
          setActiveStudyNoteId={setActiveStudyNoteId}
          setIsOpen={setIsOpen}
        />
      </div>
      <div style={currentTab === "listen" ? {} : { display: "none" }}>
        <ListenPage
          setActiveStudyNoteId={setActiveStudyNoteId}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
};

export default PageHolder;
