import { LightState } from "./PedestrianLight";
import { Suscriber } from "./Publisher";

export class Lightbulb implements Suscriber {
  notify(state: LightState) {
    console.log(`light is ${state}`)
  }
}