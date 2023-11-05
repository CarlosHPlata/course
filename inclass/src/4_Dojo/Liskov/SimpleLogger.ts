import { Logger } from "./LoggerAdapter";

export class SimpleLogger implements Logger {

  log(type: "error" | "info", payload: string) {
    console.log("type :" + type + ", payload :" + payload)
  }

}