import { useEffect, useRef, useState } from "react";
import { UploadFile } from "../components/items/UploadFile";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import StorageLayout from "../components/layout/StorageLayout";
import AOS from "aos";
import "aos/dist/aos.css";
import { ItemDetail } from "../components/items/ItemDetail";
import { UserData } from "../types";
import _ from "lodash";
import dayjs from "dayjs";
import { FileIcon } from "../components/items/FileIcon";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { getData, getFileType, handleLogout, uploadFile } from "../utils";
import { FileType } from "../enums";
import toast from "react-hot-toast";

AOS.init();

const Storage = () => {
  const [view, setView] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState<any>([]);
  const ref = useRef<HTMLTableSectionElement>(null);
  const navigate = useNavigate();
  const [userData] = useState<UserData>(
    JSON.parse(localStorage.getItem("userData") as string)
  );

  const handleClickOutside = (e: Event) => {
    if ((e.target as any)?.offsetParent !== ref.current) {
      setSelectedItem(null);
    }
  };

  const upload = async (file: File) => {
    let newFile = await uploadFile(file);
    setData((prev: any) => [...prev, newFile]);
  };

  useEffect(() => {
    if (!userData || (!localStorage.getItem("token") as boolean)) navigate("/");
    if (userData?.exp > Date.now()) handleLogout();
    (async () => {
      let tempData = await getData();
      setData(tempData);
    })();
  }, [userData, navigate]);

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
          <UploadFile
            onChange={async (e: File) => {
              toast.promise(upload(e), {
                loading: "Uploading",
                success: `${e.name} uploaded successfully`,
                error: (err) => err.message || "Unable to upload the file.",
              });
            }}
          />
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
      <div
        className="bg-gray-100 overflow-auto w-screen
       min-h-[calc(100vh-108px)] max-h-[calc(100vh-108px)]"
      >
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
              {data.map((_file: any, key: number) => {
                return (
                  <tr
                    data-aos="zoom-in"
                    onDoubleClick={async () => {
                      setSelectedItem(_file);
                      saveAs(_file.file_link, _file.file_name);
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
                        <FileIcon className="text-lg " type={_file.file_type} />{" "}
                        {_file.file_name}
                      </div>
                    </td>
                    <td
                      className={`bg-white group-hover:text-purple-600 group-hover:bg-purple-50 transition-all duration-200 ease-in border-y ${
                        selectedItem === _file
                          ? "border-purple-600"
                          : "border-white group-hover:border-purple-50"
                      }`}
                    >
                      {_file.file_size || "NA"}
                    </td>
                    <td
                      className={`bg-white group-hover:text-purple-600 group-hover:bg-purple-50 transition-all duration-200 ease-in border-y ${
                        selectedItem === _file
                          ? "border-purple-600"
                          : "border-white group-hover:border-purple-50"
                      }`}
                    >
                      {_file.file_type.toUpperCase()}{" "}
                      {getFileType(_file.file_type) !== FileType.ZIP
                        ? _.startCase(getFileType(_file.file_type))
                        : "File"}
                    </td>
                    <td
                      className={`rounded-r-lg bg-white group-hover:text-purple-600 group-hover:bg-purple-50 transition-all duration-200 ease-in border border-l-0 ${
                        selectedItem === _file
                          ? "border-purple-600"
                          : "border-white group-hover:border-purple-50"
                      }`}
                    >
                      {dayjs(_file.created_at).format("DD/MM/YYYY HH:mm")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-4 sm:gap-5 xl:gap-7 p-4 sm:p-5 xl:p-7">
            {data.map((_file: any, key: number) => {
              return (
                <div data-aos="zoom-in" key={key}>
                  <div
                    onDoubleClick={() => {
                      setSelectedItem(_file);
                      saveAs(_file.file_link);
                    }}
                    onClick={() => setSelectedItem(_file)}
                    className={`bg-white h-full text-center rounded-lg flex flex-col items-center justify-center p-2 cursor-pointer group hover:font-semibold hover:bg-purple-50 hover:shadow-md transition-all duration-200 ease-in ${
                      selectedItem === _file &&
                      "border border-purple-600 shadow-md"
                    }`}
                  >
                    <FileIcon
                      className="text-6xl md:text-7xl 2xl:text-8xl my-4 sm:my-5 group-hover:text-purple-600 transition-all duration-200 ease-in"
                      type={_file.file_type}
                    />
                    {_.truncate(_file.file_name, { length: 18 })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <ItemDetail fileData={selectedItem} show={!_.isEmpty(selectedItem)} />
      </div>
    </StorageLayout>
  );
};

export default Storage;
