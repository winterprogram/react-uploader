import { useEffect, useRef, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { Button } from "./Button";
import { InputBox } from "./InputBox";

export const CreateFolder = () => {
  const [folderName, setFolderName] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

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
    <div className="relative hover:bg-gray-50 rounded-lg px-2 py-1 cursor-pointer">
      <div
        className="flex items-center space-x-1"
        onClick={() => setShowDropdown(true)}
      >
        <FiPlusCircle className="text-green-600 text-2xl " />
        <p>Create Folder</p>
      </div>
      <div
        ref={ref}
        className={`${
          showDropdown ? "visible" : "invisible"
        } mt-2 rounded-md absolute border bg-white top-8 right-0 shadow-lg p-6 w-96 z-10`}
      >
        <InputBox
          placeholder="Folder Name"
          onChange={(e) => setFolderName(e)}
        />
        <div className="mt-4 space-x-2 flex justify-end">
          <Button
            color="red"
            label="Cancel"
            onClick={() => setShowDropdown(false)}
          />
          <Button label="Create" onClick={() => console.log(folderName)} />
        </div>
      </div>
    </div>
  );
};
