interface SwitchProps {
  children: React.ReactNode[];
}
export const Switch: React.FC<SwitchProps> = ({ children }) => {
  return (
    children.find(
      (child) =>
        !!child &&
        typeof child === "object" &&
        "props" in child &&
        (child?.props?.test === true || child?.props?.default)
    ) || null
  );
};

interface CaseWithDefaultProps {
  children: React.ReactNode;
  default: true;
}
interface CaseWithTestProps {
  children: React.ReactNode;
  test: boolean;
}
export const Case: React.FC<CaseWithDefaultProps | CaseWithTestProps> = ({
  children,
}) => children;
