import assets from "./assets/asset_manifest.json";

const getContentById = (id) => {
  return assets.find((asset) => asset.id === id);
};

type ModalContentProps = {
  id: string;
};
const ModalContent = ({ id }: ModalContentProps) => {
  const content = getContentById(id);
  if (!content) {
    console.error("no content found for id", id);
    return <div></div>;
  }
  const { title, images, audio } = content;

  return (
    <div>
      <h1>{title}</h1>
      {images && (
        <div
          style={{
            overflow: "auto",
            display: "flex",
            flexDirection: "row",
            maxWidth: "60vw",
          }}
        >
          {images
            ? images.map((url) => (
                <img
                  src={url}
                  alt={title}
                  key={url}
                  style={{ maxHeight: "20vh" }}
                />
              ))
            : null}
        </div>
      )}
      {audio && <div>{audio ? <audio controls src={audio} /> : null}</div>}
    </div>
  );
};

export default ModalContent;
