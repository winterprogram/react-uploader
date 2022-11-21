import { FileType } from "./enums";

export interface UserData {
  email: string;
  exp: number;
  name: string;
  picture: string;
  sub: string;
}

export interface FileData {
  name: string;
  link: string;
  type: FileType;
  extention: string;
  size: string;
  date_added: string;
}
