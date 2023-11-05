import { Logger, LoggerSystem } from "./LoggerAdapter";

const makeFakeStreamService = () => {
  let streams: Record<string, Record<string, string>[]>; return { init: () => { streams = {}; }, log: (type: string, payload: string) => { if (streams[type] === undefined) { streams[type] = []; } streams[type].push({ timestamp: new Date().toISOString(), payload }); }, stop: () => { console.log('----------- All logs here ------------'); console.log(JSON.stringify(streams, null, 2)); console.log('--------------------------------------'); } };
}

export class StreamLogger implements LoggerSystem, Logger {

  private service: ReturnType<typeof makeFakeStreamService>

  start() {
    this.service = makeFakeStreamService()
    this.service.init()
    return this;
  }

  log(type: 'error' | 'info', payload: string) {
    this.service.log(type, payload)
  }

  stop() {
    this.service.stop()
  }

}