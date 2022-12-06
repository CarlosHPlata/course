import { PokemonData } from "../dtos";

export interface IPokemonGateway {
  getPokemonById(id: number): Promise<PokemonData>
  getPokemonByName(name: string): Promise<PokemonData>
}