import { Logger } from "./LoggerAdapter";
import { SimpleLogger } from "./SimpleLogger";
import { StreamLogger } from "./StreamLogger";

const logNow = (logger: Logger) => {
  logger.log('error', 'error')
  logger.log('info', 'information')
  logger.log('error', 'error2')
  logger.log('info', 'information2')
}

const myLogger = new SimpleLogger();
logNow(myLogger)