import { Move, PokemonData, PokemonStats, Sprites, Stat } from '../dtos/PokemonData'

export const mapToPokemonDto = (pokeApiRes: any): PokemonData => ({
  id: pokeApiRes.id,
  name: pokeApiRes.name,
  pokedexNumber: pokeApiRes.order,
  weight: pokeApiRes.weight,
  height: pokeApiRes.height,
  moves: mapMoves(pokeApiRes),
  sprites: mapSprites(pokeApiRes),
  stats: mapStats(pokeApiRes),
  types: mapTypes(pokeApiRes)
})

const mapSprites = ({ sprites }: any): Sprites => ({
  normal: sprites.front_default,
  female: sprites.front_female,
  shiny: sprites.front_shiny,
  femaleShiny: sprites.front_shiny_female
})

const mapTypes = ({ types }: any): string[] =>
  types.map((t: any) => t.type.name)

const mapStats = ({ stats }: any): PokemonStats => ({
  hp: mapSpecificStat(stats.find((s: any) => s.stat.name === 'hp')),
  attack: mapSpecificStat(stats.find((s: any) => s.stat.name === 'attack')),
  defense: mapSpecificStat(stats.find((s: any) => s.stat.name === 'defense')),
  specialAttack: mapSpecificStat(
    stats.find((s: any) => s.stat.name === 'special-attack')
  ),
  specialDefense: mapSpecificStat(
    stats.find((s: any) => s.stat.name === 'special-defense')
  ),
  speed: mapSpecificStat(stats.find((s: any) => s.stat.name === 'speed'))
})

const mapSpecificStat = (apiStat: any): Stat => ({
  base: apiStat?.base_stat ?? -1,
  maxEvs: apiStat?.effort ?? -1
})

const mapMoves = ({ moves }: any): Move[] =>
  moves.map((m: any) => ({
    name: m.move.name,
    level: m.version_group_details[0].level_learned_at
  }))
