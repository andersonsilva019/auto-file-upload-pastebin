import 'dotenv/config';
import { createFile } from './services/createFile'
import { resolve } from 'path'
import readlineSync from 'readline-sync'
import { makeLogger } from './Logger'
import { login } from './services/login';
import { API_USER_NAME, API_USER_PASSWORD } from './config/env';

const logger = makeLogger();

async function main() {

  const fileName = readlineSync.question('Digite o nome do arquivo: ');

  const fileFormat = readlineSync.question('Digite o formato do arquivo: ');

  const fileStatus = readlineSync.question('Digite o status do arquivo( 0=public 1=unlisted 2=private ): ');

  const fileExpireDate = readlineSync.question('Digite o tempo de expiração do arquivo( N=never 10M=10 minutes 1H=1 hour 1D=1 day 1W=1 week 2W=2 weeks 1M=1 month 6M=6 months 1Y=1 year ): ');

  const pathToFileTmp = resolve(__dirname, '..', 'tmp', 'tmp.txt');

  logger.info({
    type: 'INITIAL_FILE_CREATION',
    message: 'Iniciando criação do arquivo',
  });

  const apiUserKey = await login({ username: API_USER_NAME, password: API_USER_PASSWORD });

  const url = await createFile({
    fileName,
    fileFormat,
    expireDate: fileExpireDate,
    pathToFile: pathToFileTmp,
    privatePaste: fileStatus,
    userKey: apiUserKey
  });

  return url;
}

main().then(url => {
  logger.info({
    type: 'FILE_CREATED',
    message: `Arquivo criado com sucesso: ${url}`,
  });
});