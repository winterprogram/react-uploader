import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { UserData } from "../../types";
import { handleLogout } from "../../utils";

AOS.init();

interface Props {
  userData: UserData;
}

export const ProfilePic: React.FC<Props> = ({ userData }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  const handleClickOutside = (e: Event) => {
    if ((e.target as any)?.offsetParent !== ref.current) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="relative cursor-pointer">
      <img
        data-aos="zoom-in"
        onClick={() => setShowDropdown(true)}
        className="h-10 w-10 rounded-full border border-purple-400 hover:border-purple-600 hover:shadow-lg"
        alt={userData?.name}
        src={userData?.picture}
      />
      <ul
        ref={ref}
        className={`${
          showDropdown ? "visible opacity-100" : "invisible opacity-0"
        } mt-2 rounded-md border bg-white absolute w-full sm:w-80 top-10 right-0 shadow-lg divide-y cursor-default transition-all duration-500 ease-in-out text-gray-700 z-10`}
      >
        <li className="px-4 py-3 flex">
          <img
            className="h-14 w-14 rounded-lg border"
            alt={userData?.name}
            src={userData?.picture}
          />
          <div className="flex flex-col text-sm justify-center px-4">
            <strong className="text-black text-base">{userData?.name}</strong>
            <p>{userData?.email}</p>
          </div>
        </li>
        <li
          className="flex items-center px-4 py-1.5 my-1 hover:text-purple-600 hover:bg-purple-50 cursor-pointer"
          onClick={handleLogout}
        >
          <FiLogOut className="mr-2" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};
