import { Pokemon } from "../../../pokemon";
import PokemonEncounter from "../entities/pokemonEncounter.entity";
import ITrainerGateway from "../interfaces/trainer.gateway";
import { CapturedDto } from "./output.dto";

export const makeCapture =
  (trainerGateway: ITrainerGateway) =>
  async (trainerId: number, pokemon: Pokemon): Promise<CapturedDto> => {
    const pokemonEncounter = new PokemonEncounter(pokemon);

    const hit = getHit();
    const captured = pokemonEncounter.canCaptureIt(hit);

    let pcId:number|undefined;
    if (captured) {
      const savedPokemon = await trainerGateway.sendPokemonToTrainerPc(trainerId, pokemonEncounter.pokemon);
      pcId = savedPokemon.pcId;
    }

    return { captured, pcId };
  };

export const getHit = () => {
  const min = 1;
  const max = 100;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
