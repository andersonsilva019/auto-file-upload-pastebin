import fetch from "node-fetch";
import { readFile, writeFile, unlink } from "fs/promises";
import { configPastebin } from "../config";
import { CreateFileTypes } from "../types/createFileTypes";
import { openEditorToFile } from "./exec";
import { API_DEV_KEY } from "../config/env";
import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";

const API_ENDPOINT = "https://pastebin.com/api/api_post.php";

function getTmpFile() {
  const pathToFileTmpFolder = resolve("tmp");
  const pathToFileTmp = resolve("tmp", "tmp.txt");
  if (!existsSync(pathToFileTmpFolder)) {
    mkdirSync(pathToFileTmpFolder);
  }
  return pathToFileTmp;
}

async function createFile({
  fileName,
  fileFormat,
  expireDate,
  privatePaste,
  userKey,
}: CreateFileTypes) {
  try {
    const pathToFile = getTmpFile();
    // only to create the file in the tmp folder
    await writeFile(pathToFile, "");

    // open the file in the editor
    await openEditorToFile(pathToFile);

    // read the file
    const file = await readFile(pathToFile, "utf-8");

    // get config params
    const body = configPastebin({
      api_dev_key: API_DEV_KEY,
      api_paste_code: file,
      api_option: "paste",
      api_paste_expireDate: expireDate,
      api_paste_format: fileFormat,
      api_paste_name: fileName,
      api_paste_private: privatePaste,
      api_user_key: userKey,
    });

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      body: body,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const url = await response.text();

    // delete the file
    await unlink(pathToFile);

    return url;
  } catch (error) {
    console.log(error);
  }
}

export { createFile };
