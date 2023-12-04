const icons = {
  location: (size: string | number) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  ),
  image: (size: string | number) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  ),
  default: (size: string | number) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  ),
};

type TimestampedActionButtonProps = {
  left: number;
  type: "location" | "image";
  onClick: () => void;
  active?: boolean;
};
const TimestampedActionButton = ({
  left,
  type,
  onClick,
  active,
}: TimestampedActionButtonProps) => {
  return (
    <div
      style={{
        position: "absolute",
        left,
        marginLeft: "-1rem",
      }}
    >
      <style>
        {`
            .timestamped-action-button:hover {
                background-color: #a0cdfa !important;
            }
            .timestamped-action-button:active {
                background-color: #90cdf9 !important;
            }
        `}
      </style>
      <button
        className="timestamped-action-button"
        style={{
          borderRadius: "50%",
          padding: "6px",
          backgroundColor: "#bae6fd",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: active ? "scale(1.2)" : "scale(1)",
          transition: "transform 0.2s ease-in-out",
        }}
        onClick={onClick}
      >
        <span style={{ height: "2rem" }}>
          {type in icons ? icons[type]("2rem") : icons.default("2rem")}
        </span>
      </button>
    </div>
  );
};

export default TimestampedActionButton;
