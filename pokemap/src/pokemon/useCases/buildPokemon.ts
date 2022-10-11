import { Gender, Move, PokemonStats } from '../dtos/metadata'
import { Pokemon, PokemonBaseData, PokemonMoves } from '../dtos/pokemon.dto'
import { Sprites } from '../dtos/pokemonInfo.dto'
import { getPokemon } from './getPokemon'

export interface PokemonBuilder {
  buildBaseData(id: number, name: string): Promise<PokemonBaseData>
  buildMoves(moves: Move[]): Promise<PokemonMoves>
  buildStats(statsData: PokemonStats): Promise<PokemonStats>
}

const buildSprite = (sprites: Sprites, base: PokemonBaseData): string => {
  if (
    base.gender === Gender.FEMALE &&
    sprites.female != null &&
    sprites.femaleShiny != null
  ) {
    return base.isShiny ? sprites.femaleShiny : sprites.female
  }

  return base.isShiny ? sprites.shiny : sprites.normal
}

export const buildPokemon = async (
  id: number,
  builder: PokemonBuilder
): Promise<Pokemon> => {
  const pokemonData = await getPokemon({ id })
  const baseData = await builder.buildBaseData(pokemonData.id, pokemonData.name)
  const moves = await builder.buildMoves(pokemonData.moves)
  const stats = await builder.buildStats(pokemonData.stats)

  return {
    id: pokemonData.id,
    pokedexNumber: pokemonData.pokedexNumber,
    name: pokemonData.name,
    weight: pokemonData.weight,
    height: pokemonData.height,
    types: pokemonData.types,
    sprite: buildSprite(pokemonData.sprites, baseData),
    ...baseData,
    moves,
    stats,
  }
}
