import { useEffect, useState } from "react";

interface Props {
  className?: string;
  label: string;
  color?: string;
  onClick: (arg?: any) => void;
}

export const Button: React.FC<Props> = ({
  className,
  label,
  color,
  onClick,
}) => {
  const [buttonColor, setButtonColor] = useState("");
  useEffect(() => {
    setButtonColor(`bg-${color ?? "purple"}-600`);
  }, [color]);
  return (
    <button
      className={
        `${
          className ?? "w-fit"
        } border rounded-lg text-white font-semibold py-2 px-4 ` + buttonColor
      }
      onClick={() => onClick()}
    >
      {label}
    </button>
  );
};
