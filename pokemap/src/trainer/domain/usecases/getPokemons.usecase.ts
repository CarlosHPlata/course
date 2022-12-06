import { Pokemon } from "../../../pokemon";
import { ITrainerGateway } from "../interfaces/trainer.gateway";

const makeGetPokemons =
  (trainerGateway: ITrainerGateway) =>
  (trainerId: number): Promise<Pokemon[]> => {
    return trainerGateway.getPokemonsFromTrainer(trainerId);
  };

export default makeGetPokemons;
