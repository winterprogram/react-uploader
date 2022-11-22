import saveAs from "file-saver";
import { FiDownload } from "react-icons/fi";

interface Props {
  fileData?: any;
  show?: boolean;
}

export const ItemDetail: React.FC<Props> = ({ fileData, show }) => {
  return (
    <div
      className={`${
        show ? "translate-y-0 visible" : "translate-y-20 invisible"
      } absolute md:fixed bottom-0 flex justify-between border-t px-5 py-4 bg-white w-full transition-all duration-400 ease-in-out`}
    >
      <div className="flex space-x-4">
        <p>{fileData?.file_name}</p>
        {fileData?.file_size && (
          <div className="-mt-1 pt-1 pb-0.5 px-3 rounded-full bg-gray-200">
            {fileData?.file_size}
          </div>
        )}
      </div>
      <div className="flex space-x-4">
        <FiDownload
          onDoubleClick={() => {
            saveAs(fileData?.file_link ?? "", fileData?.file_name);
          }}
          className="text-xl cursor-pointer hover:text-purple-600"
        />
      </div>
    </div>
  );
};
