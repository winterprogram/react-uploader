import axios from "axios";
import { FileType } from "./enums";

export const handleLogout = () => {
  google.accounts.id.initialize({
    client_id: process.env.REACT_APP_CLIENT_ID ?? "",
    auto_select: true,
  });
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  google.accounts.id.disableAutoSelect();
  window.location.href = "/";
};

const formatBytes = (n: number) => {
  const units = ["bytes", "KB", "MB", "GB", "TB"];
  let l = 0;
  while (n >= 1024 && ++l) {
    n = n / 1024;
  }
  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
};

export const getData = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      "http://localhost:8000/api/files/:skip/:limit",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.paginatedData;
  } catch (error: any) {
    console.error(error?.message);
  }
};

export const uploadFile = async (file: File) => {
  try {
    const token = localStorage.getItem("token");
    const { data: preSignedData } = await axios.post(
      "http://localhost:8000/api/upload-url",
      {
        ext: file.name.split(".").pop(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await axios.put(preSignedData?.url, file);
    const { data } = await axios.post(
      "http://localhost:8000/api/upload",
      {
        file_name: file.name,
        file_size: formatBytes(file.size),
        file_link: `https://samplefilestoragebucket.s3.amazonaws.com/${preSignedData.fileName}`,
        file_type: file.name.split(".").pop(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.userFileUpload;
  } catch (error: any) {
    console.error(error?.message);
  }
};

export const getFileType = (ext: string) => {
  if (
    ext === "3fr" ||
    ext === "apng" ||
    ext === "avif" ||
    ext === "gif" ||
    ext === "ico" ||
    ext === "svg" ||
    ext === "jpg" ||
    ext === "jpeg" ||
    ext === "jfif" ||
    ext === "pjpeg" ||
    ext === "pjp" ||
    ext === "png" ||
    ext === "webp" ||
    ext === "bmp" ||
    ext === "cur" ||
    ext === "tif" ||
    ext === "tiff"
  )
    return FileType.Image;
  if (
    ext === "pcm" ||
    ext === "wav" ||
    ext === "aiff" ||
    ext === "mp3" ||
    ext === "aac" ||
    ext === "wma" ||
    ext === "flac" ||
    ext === "alac" ||
    ext === "ogg" ||
    ext === "dsd" ||
    ext === "pcm"
  )
    return FileType.Audio;
  if (
    ext === "3gpp" ||
    ext === "3gp" ||
    ext === "mp4" ||
    ext === "mov" ||
    ext === "wmv" ||
    ext === "avi" ||
    ext === "avchd" ||
    ext === "flv" ||
    ext === "f4v" ||
    ext === "swf" ||
    ext === "mkv" ||
    ext === "webm" ||
    ext === "html5" ||
    ext === "mpeg" ||
    ext === "mpg" ||
    ext === "ts"
  )
    return FileType.Video;
  if (
    ext === "key" ||
    ext === "ppt" ||
    ext === "pptx" ||
    ext === "pptm" ||
    ext === "html" ||
    ext === "txt" ||
    ext === "pdf" ||
    ext === "pages" ||
    ext === "doc" ||
    ext === "docx" ||
    ext === "doxm" ||
    ext === "xls" ||
    ext === "xlsx" ||
    ext === "odt" ||
    ext === "ods" ||
    ext === "dot" ||
    ext === "dotx"
  )
    return FileType.Document;
  if (ext === "rar" || ext === "zip" || ext === "tar" || ext === "arj")
    return FileType.ZIP;
  return "";
};
