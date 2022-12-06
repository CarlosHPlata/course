import { Pokemon } from "../../../pokemon";
import { Trainer } from "../dtos";

export interface ITrainerGateway {
  getTrainerById(id: number): Promise<Trainer>;
  getPokemonsFromTrainer(id: number): Promise<Pokemon[]>;
  savePokemon(id: number, pokemon:Pokemon): Promise<Pokemon>;
}
