import { useRef } from "react";
import { FiArrowUpCircle } from "react-icons/fi";

export const UploadFile = (props: { onChange: (e: File) => void }) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => ref.current?.click()}
      className="flex items-center space-x-1 hover:bg-gray-50 rounded-lg px-2 py-1 cursor-pointer"
    >
      <FiArrowUpCircle className="text-purple-600 text-2xl" />
      <p>Upload File</p>
      <input
        ref={ref}
        className="hidden"
        type="file"
        onClick={(event) => ((event.target as HTMLInputElement).value = "")}
        onChange={async (e) => {
          if (e.target.files?.[0]) props.onChange(e.target.files[0]);
        }}
      />
    </div>
  );
};
