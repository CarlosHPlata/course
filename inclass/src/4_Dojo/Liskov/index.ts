import { LoggerAdapter } from "./LoggerAdapter";
import { StreamLogger } from "./StreamLogger";

const logNow = (logger: LoggerAdapter) => {
  logger.log('error', 'error')
  logger.log('info', 'information')
  logger.log('error', 'error2')
  logger.log('info', 'information2')
}

const myLogger = new StreamLogger().start();
logNow(myLogger)
myLogger.stop()