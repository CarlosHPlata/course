import { game } from "./game";
import { seed } from "./utils";
import { printGame } from "./utils/printer";

const cellSeed = seed("penta")
game(printGame, cellSeed, { size: [25, 25], frames: 100 })