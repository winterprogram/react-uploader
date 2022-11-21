import { useRef } from "react";

interface Props {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange: (str: string) => void;
}

export const InputBox: React.FC<Props> = ({
  className,
  placeholder,
  value,
  onChange,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <input
      className={`appearance-none focus:outline-none focus-within:shadow-lg pt-2.5 pb-1.5 px-4 w-full border rounded-lg focus-within:border-purple-600 transition duration-200 flex overflow-hidden ${className}`}
      ref={ref}
      value={value}
      placeholder={placeholder ?? "Input"}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
