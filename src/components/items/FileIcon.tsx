import { FileType } from "../../enums";
import {
  ImFileEmpty,
  ImFileMusic,
  ImFilePicture,
  ImFileText2,
  ImFileVideo,
  ImFileZip,
} from "react-icons/im";
import { getFileType } from "../../utils";

export const FileIcon = (props: { type: string; className: string }) => {
  switch (getFileType(props.type)) {
    case FileType.Image:
      return <ImFilePicture className={props.className} />;
    case FileType.Document:
      return <ImFileText2 className={props.className} />;
    case FileType.Audio:
      return <ImFileMusic className={props.className} />;
    case FileType.Video:
      return <ImFileVideo className={props.className} />;
    case FileType.ZIP:
      return <ImFileZip className={props.className} />;
    default:
      return <ImFileEmpty className={props.className} />;
  }
};
