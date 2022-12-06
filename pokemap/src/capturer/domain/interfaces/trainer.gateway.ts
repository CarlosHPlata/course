import { Pokemon } from "../../../pokemon";

export default interface ITrainerGateway {
  sendPokemonToTrainerPc(trainerId: number, pokemon: Pokemon): Promise<Pokemon>;
}