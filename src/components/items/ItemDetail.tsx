import { FiDownload, FiTrash2 } from "react-icons/fi";
import { FileData } from "../../types";

interface Props {
  fileData?: FileData;
  show?: boolean;
}

export const ItemDetail: React.FC<Props> = ({ fileData, show }) => {
  return (
    <div
      className={`${
        show ? "translate-y-0" : "translate-y-20"
      } absolute md:fixed bottom-0 flex justify-between border-t px-5 py-4 bg-white w-full transition-all duration-400 ease-in-out`}
    >
      <div className="flex space-x-4">
        <p>{fileData?.name}</p>
        <div className="-mt-1 pt-1 pb-0.5 px-3 rounded-full bg-gray-200">
          {fileData?.size}
        </div>
      </div>
      <div className="flex space-x-4">
        <FiDownload className="text-xl cursor-pointer hover:text-purple-600" />
        <FiTrash2 className="text-xl cursor-pointer hover:text-purple-600" />
      </div>
    </div>
  );
};
