import { makeSavePokemon } from "../../../trainer/domain/usecases/save.pokemon.usecase";
import * as ExternalGw from "../../../trainer/infrastructure/trainer.gateway";
import { Pokemon } from "../../../pokemon";
import ITrainerGateway from "../../domain/interfaces/trainer.gateway";

export const trainerGateway: ITrainerGateway = {
  sendPokemonToTrainerPc: (
    trainerId: number,
    pokemon: Pokemon
  ): Promise<Pokemon> => {
    const savePokemon = makeSavePokemon(ExternalGw.trainerGateway);
    return savePokemon(trainerId, pokemon);
  }
}
