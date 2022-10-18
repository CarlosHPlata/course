import { runQuery } from '../../db'
import {
  buildPokemon,
  Gender,
  Move,
  Pokemon,
  PokemonBaseData,
  PokemonBuilder,
  PokemonMoves,
} from '../../pokemon'
import { GarchompMock } from '../dtos/mock'
import { BuildPokemons } from '../interfaces/BuildPokemons'

export const makeGetPokemons =
  (buildPokemons: BuildPokemons) =>
  async (userId: number): Promise<Pokemon[]> => {
    const pokemons = await buildPokemons(userId)

    return pokemons
  }
