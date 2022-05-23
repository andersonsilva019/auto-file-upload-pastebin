import pino from 'pino'
import { Logger, LogData } from './types'

const pinoLogger = pino({
  level: 'debug'
});

const parseLoggerInputPinoFormat = <T>({ message, error, ...data }: LogData<T>) => ({
  msg: message,
  err: error,
  ...data
})

const AppLogger: Logger = {
  debug: <T>(logData: LogData<T>) => pinoLogger.debug(parseLoggerInputPinoFormat(logData)),
  info: <T>(logData: LogData<T>) => pinoLogger.info(parseLoggerInputPinoFormat(logData)),
  warn: <T>(logData: LogData<T>) => pinoLogger.warn(parseLoggerInputPinoFormat(logData)),
  error: <T>(logData: LogData<T>) => pinoLogger.error(parseLoggerInputPinoFormat(logData)),
}

export default (): Logger => AppLogger;