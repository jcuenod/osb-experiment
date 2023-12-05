import assets from "./assets/asset_manifest.json";

const getContentById = (id: string) => {
  return assets.find((asset) => asset.id === id);
};

const getAbsolutePath = (relativePath: string) => {
  return `${import.meta.env.BASE_URL}${relativePath}`;
};

type ModalContentProps = {
  id: string;
};
const ModalContent = ({ id }: ModalContentProps) => {
  const content = getContentById(id);
  if (!content) {
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
                  src={getAbsolutePath(url)}
                  alt={title}
                  key={url}
                  style={{ maxHeight: "20vh" }}
                />
              ))
            : null}
        </div>
      )}
      {audio && (
        <div>
          {audio ? <audio controls src={getAbsolutePath(audio)} /> : null}
        </div>
      )}
    </div>
  );
};

export default ModalContent;
