import { PokemonData } from '../dtos/pokemonInfo.dto'

export interface IPokemonGateway {
  getPokemonById(id: number): Promise<PokemonData>
  getPokemonByName(name: string): Promise<PokemonData>
}
