import { ExpireDateParams, StatusPaste } from "./configPastebinTypes";

export interface CreateFileTypes {
  fileName: string;
  pathToFile: string;
  fileFormat: string;
  privatePaste: string;
  expireDate: string;
  userKey: string;
}