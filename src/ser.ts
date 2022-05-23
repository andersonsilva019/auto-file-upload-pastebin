import { makeLogger } from './Logger'

const logger = makeLogger();

logger.debug({
  message: 'Hello world',
  type: 'LOG_TYPE',
})