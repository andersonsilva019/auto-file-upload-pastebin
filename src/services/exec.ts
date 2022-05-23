import { access, } from 'fs/promises'
import { constants } from 'fs'
import { promisify } from 'util'
import { exec as execChildProcess } from 'child_process'

const exec = promisify(execChildProcess);

async function openEditorToFile(pathToFile: string) {
  await access(`${pathToFile}`, constants.W_OK | constants.R_OK);
  await exec(`kate ${pathToFile}`);
}

export { openEditorToFile }