import { Lightbulb } from "./Lightbulb";
import { PedestrianLight } from "./PedestrianLight";

const lightbulb = new Lightbulb()
const pedestrianLight = new PedestrianLight(false, lightbulb);

pedestrianLight.change().then()