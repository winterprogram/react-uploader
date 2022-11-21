import { useRef } from "react";
import { FiSearch } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

interface Props {
  className?: string;
  handleSearch: () => void;
  onChange: (str: string) => void;
}

export const SearchBox: React.FC<Props> = ({
  className,
  handleSearch,
  onChange,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      data-aos="zoom-in"
      className={`focus-within:shadow-lg border border-purple-400 rounded-full focus-within:border-purple-600 transition duration-200 flex overflow-hidden ${className}`}
      onClick={() => ref?.current?.focus()}
    >
      <input
        className={`appearance-none py-2 px-6 w-full focus:outline-none`}
        ref={ref}
        placeholder={"Search"}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="pr-4 text-xl" onClick={handleSearch}>
        <FiSearch className="text-gray-500 hover:text-purple-600" />
      </button>
    </div>
  );
};
