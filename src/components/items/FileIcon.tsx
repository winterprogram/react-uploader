import { FileType } from "../../enums";
import {
  ImFileEmpty,
  ImFileMusic,
  ImFilePdf,
  ImFilePicture,
  ImFileVideo,
  ImFileZip,
} from "react-icons/im";

export const FileIcon = (props: { type: string; className: string }) => {
  switch (props.type) {
    case FileType.Image:
      return <ImFilePicture className={props.className} />;
    case FileType.Document:
      return <ImFilePdf className={props.className} />;
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
