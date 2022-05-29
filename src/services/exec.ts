import { access } from "fs/promises";
import { constants } from "fs";
import { promisify } from "util";
import { resolve } from "path";
import { exec as execChildProcess } from "child_process";
import { platform } from "os";

const exec = promisify(execChildProcess);

async function openEditorToFile(pathToFile: string) {
  const pathToEditor = resolve(
    __dirname,
    "..",
    "lib",
    "executable",
    "notepad",
    "notepad++.exe"
  );
  await access(`${pathToFile}`, constants.W_OK | constants.R_OK);

  await exec(`${pathToEditor} ${pathToFile}`);
}

export { openEditorToFile };
