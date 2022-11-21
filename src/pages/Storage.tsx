import { useEffect, useRef, useState } from "react";
import { UploadFile } from "../components/items/UploadFile";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import StorageLayout from "../components/layout/StorageLayout";
import AOS from "aos";
import "aos/dist/aos.css";
import { ItemDetail } from "../components/items/ItemDetail";
import { FileData } from "../types";
import _ from "lodash";
import dayjs from "dayjs";
import { FileType } from "../enums";
import { FileIcon } from "../components/items/FileIcon";
import { saveAs } from "file-saver";

AOS.init();

const data: FileData[] = [
  {
    name: "Temp PDF File",
    size: "44 KB",
    type: "document" as FileType,
    extention: "pdf",
    date_added: dayjs().toString(),
    link: "https://clri-ltc.ca/files/2018/09/TEMP-PDF-Document.pdf",
  },
  {
    name: "Temp Image File",
    size: "449 KB",
    type: "image" as FileType,
    extention: "jpeg",
    date_added: dayjs().toString(),
    link: "https://clri-ltc.ca/files/2018/09/TEMP-PDF-Document.pdf",
  },
  {
    name: "Temp Audio File",
    size: "4.5 MB",
    type: "audio" as FileType,
    extention: "mp3",
    date_added: dayjs().toString(),
    link: "https://clri-ltc.ca/files/2018/09/TEMP-PDF-Document.pdf",
  },
  {
    name: "Temp Video File",
    size: "44 MB",
    type: "video" as FileType,
    extention: "mp4",
    date_added: dayjs().toString(),
    link: "https://clri-ltc.ca/files/2018/09/TEMP-PDF-Document.pdf",
  },
];

const Storage = () => {
  const [view, setView] = useState("list");
  const [selectedItem, setSelectedItem] = useState<FileData>(
    null as unknown as FileData
  );
  const ref = useRef<HTMLTableSectionElement>(null);
  const handleClickOutside = (e: Event) => {
    if ((e.target as any)?.offsetParent !== ref.current) {
      setSelectedItem(null as unknown as FileData);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
  return (
    <StorageLayout>
      <div
        data-aos="zoom-in"
        className="flex justify-between items-center px-5 pb-1"
      >
        <div className="flex items-center text-sm font-semibold text-gray-500">
          Cloud Storage
        </div>
        <div className="flex items-center space-x-6">
          <UploadFile />
          <div className="flex items-center text-lg space-x-4">
            <FaListUl
              onClick={() => setView("list")}
              className={` cursor-pointer transition-all duration-300 ease-in-out ${
                view === "list"
                  ? "text-gray-800 -translate-y-0.5"
                  : "text-gray-400"
              }`}
            />
            <BsGrid3X3GapFill
              onClick={() => setView("grid")}
              className={`cursor-pointer transition-all duration-300 ease-in-out ${
                view === "grid"
                  ? "text-gray-800 -translate-y-0.5"
                  : "text-gray-400"
              }`}
            />
            <div
              className={`h-1 w-6 absolute top-[26px] rounded-full bg-purple-600 transition-all duration-300 ease-in-out ${
                view === "grid" ? " translate-x-[15px]" : "-translate-x-[19px]"
              }`}
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 min-h-[calc(100vh-108px)]">
        {view === "list" ? (
          <table className="w-[calc(100%-2rem)] mx-5 mt-3">
            <thead data-aos="zoom-in" className="">
              <tr className="[&>*]:text-start [&>*]:p-2 [&>*]:pb-1.5">
                <th>Name</th>
                <th>Size</th>
                <th>Type</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody ref={ref} className="text-sm">
              {data.map((_file, key) => {
                return (
                  <tr
                    data-aos="zoom-in"
                    onDoubleClick={async () => {
                      setSelectedItem(_file);
                      saveAs(_file.link);
                    }}
                    onClick={() => setSelectedItem(_file)}
                    key={key}
                    className={`[&>*]:py-1.5 [&>*]:pl-2 rounded-lg shadow-sm hover:cursor-pointer group hover:shadow-md `}
                  >
                    <td
                      className={`rounded-l-lg bg-white group-hover:text-purple-600 group-hover:bg-purple-50 transition-all duration-200 ease-in border border-r-0 ${
                        selectedItem === _file
                          ? "border-purple-600"
                          : "border-white group-hover:border-purple-50"
                      }`}
                    >
                      <div className="flex items-center gap-2 ">
                        <FileIcon className="text-lg " type={_file.type} />{" "}
                        {_file.name}
                      </div>
                    </td>
                    <td
                      className={`bg-white group-hover:text-purple-600 group-hover:bg-purple-50 transition-all duration-200 ease-in border-y ${
                        selectedItem === _file
                          ? "border-purple-600"
                          : "border-white group-hover:border-purple-50"
                      }`}
                    >
                      {_file.size}
                    </td>
                    <td
                      className={`bg-white group-hover:text-purple-600 group-hover:bg-purple-50 transition-all duration-200 ease-in border-y ${
                        selectedItem === _file
                          ? "border-purple-600"
                          : "border-white group-hover:border-purple-50"
                      }`}
                    >
                      {_file.extention.toUpperCase()} {_.startCase(_file.type)}
                    </td>
                    <td
                      className={`rounded-r-lg bg-white group-hover:text-purple-600 group-hover:bg-purple-50 transition-all duration-200 ease-in border border-l-0 ${
                        selectedItem === _file
                          ? "border-purple-600"
                          : "border-white group-hover:border-purple-50"
                      }`}
                    >
                      {dayjs(_file.date_added).format("DD/MM/YYYY HH:mm")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-4 sm:gap-5 xl:gap-7 p-4 sm:p-5 xl:p-7">
            {data.map((_file, key) => {
              return (
                <div data-aos="zoom-in" key={key}>
                  <div
                    onDoubleClick={() => {
                      setSelectedItem(_file);
                      saveAs(_file.link);
                    }}
                    onClick={() => setSelectedItem(_file)}
                    className={`bg-white rounded-lg flex flex-col items-center justify-center p-2 cursor-pointer group hover:font-semibold hover:bg-purple-50 hover:shadow-md transition-all duration-200 ease-in ${
                      selectedItem === _file &&
                      "border border-purple-600 shadow-md"
                    }`}
                  >
                    <FileIcon
                      className="text-6xl md:text-7xl 2xl:text-8xl my-4 sm:my-5 group-hover:text-purple-600 transition-all duration-200 ease-in"
                      type={_file.type}
                    />
                    {_file.name}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <ItemDetail fileData={selectedItem} show={!_.isEmpty(selectedItem)} />
    </StorageLayout>
  );
};

export default Storage;
