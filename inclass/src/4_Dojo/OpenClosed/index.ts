import { Lightbulb } from "./Lightbulb";
import { PedestrianLight } from "./PedestrianLight";
import { Speaker } from "./Speaker";

const lightbulb = new Lightbulb()
const speaker = new Speaker()
const pedestrianLight = new PedestrianLight(false);
pedestrianLight.suscribe(lightbulb)
pedestrianLight.suscribe(speaker)

pedestrianLight.change().then()