import { Pokemon } from "../../../pokemon";
import { ITrainerGateway } from "../interfaces/trainer.gateway";

export const makeSavePokemon =
  (trainerGw: ITrainerGateway) => (trainerId: number, pokemon: Pokemon) =>
    trainerGw.savePokemon(trainerId, pokemon);
