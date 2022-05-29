import { access } from "fs/promises";
import { constants } from "fs";
import { promisify } from "util";
import { exec as execChildProcess } from "child_process";
import { platform } from "os";

const exec = promisify(execChildProcess);

async function openEditorToFile(pathToFile: string) {
  await access(`${pathToFile}`, constants.W_OK | constants.R_OK);

  const defaultEditorFrom = {
    linux: "kate",
    win32: "notepad",
  };
  const os = platform();
  await exec(`${defaultEditorFrom[os]} ${pathToFile}`);
}

export { openEditorToFile };
