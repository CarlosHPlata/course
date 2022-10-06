import { Move, PokemonStats, Stat } from '../dtos/metadata'
import { PokemonData, Sprites } from '../dtos/pokemonInfo.dto'
import type { PokemonAPIRes, Stat as StatApi } from './pokemonMapper.types'

const mapSprites = ({ sprites }: PokemonAPIRes): Sprites => ({
  normal: sprites.front_default,
  female: sprites.front_female,
  shiny: sprites.front_shiny,
  femaleShiny: sprites.front_shiny_female,
})

const mapTypes = ({ types }: PokemonAPIRes): string[] =>
  types.map((t) => t.type.name)

const mapSpecificStat = (apiStat: StatApi | undefined): Stat => ({
  base: apiStat?.base_stat ?? -1,
  maxEvs: apiStat?.effort ?? -1,
})

const mapStats = ({ stats }: PokemonAPIRes): PokemonStats => ({
  hp: mapSpecificStat(stats.find((s) => s.stat.name === 'hp')),
  attack: mapSpecificStat(stats.find((s) => s.stat.name === 'attack')),
  defense: mapSpecificStat(stats.find((s) => s.stat.name === 'defense')),
  specialAttack: mapSpecificStat(
    stats.find((s) => s.stat.name === 'special-attack')
  ),
  specialDefense: mapSpecificStat(
    stats.find((s) => s.stat.name === 'special-defense')
  ),
  speed: mapSpecificStat(stats.find((s) => s.stat.name === 'speed')),
})

const mapMoves = ({ moves }: PokemonAPIRes): Move[] =>
  moves.map((m) => ({
    name: m.move.name,
    level: m.version_group_details[0].level_learned_at,
  }))

export const mapToPokemonDto = (pokeApiRes: PokemonAPIRes): PokemonData => ({
  id: pokeApiRes.id,
  name: pokeApiRes.name,
  pokedexNumber: pokeApiRes.order,
  weight: pokeApiRes.weight,
  height: pokeApiRes.height,
  moves: mapMoves(pokeApiRes),
  sprites: mapSprites(pokeApiRes),
  stats: mapStats(pokeApiRes),
  types: mapTypes(pokeApiRes),
})
