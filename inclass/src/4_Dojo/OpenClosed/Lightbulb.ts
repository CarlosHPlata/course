import { LightState } from "./PedestrianLight";

export class Lightbulb {
  showLight(state: LightState) {
    console.log(`light is ${state}`)
  }
}