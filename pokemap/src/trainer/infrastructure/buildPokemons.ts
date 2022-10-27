import { BuildPokemons } from '../interfaces/BuildPokemons'
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

export const buildPokemons: BuildPokemons = async (userId: number) => {
  const dbRes = await getPokemonsFromDB(userId)
  const pokemons = await mapToPokemons(dbRes)

  return pokemons
}

const mapToPokemons = async (dbRes: any[]): Promise<Pokemon[]> => {
  return Promise.all(
    dbRes.map((row) => {
      return mapToPokemon(row)
    })
  )
}

const mapToPokemon = (row: any): Promise<Pokemon> => {
  const builder: PokemonBuilder = {
    buildBaseData: () => buildBaseData(row),
    buildMoves: async (moves: Move[]) => buildPokemonMoves(row.pc_id, moves),
    buildStats: async () => buildPokemonStats(row.pc_id),
  }
  return buildPokemon(row.id, builder)
}

const buildBaseData = (row: any): Promise<PokemonBaseData> =>
  Promise.resolve({
    customName: row.customName || undefined,
    gender: row.is_male ? Gender.MALE : Gender.FEMALE,
    isShiny: !!row.is_shiny,
  })

const buildPokemonMoves = async (
  pcId: number,
  allMoves: Move[]
): Promise<PokemonMoves> => {
  const { results } = await runQuery(
    `
        SELECT * FROM pokemon_pc_moves
        where pokemon_pc_moves.pc_id = $pcId
      `,
    { pcId }
  )

  const moves: PokemonMoves = [null, null, null, null]
  results.forEach((row, index) => {
    const moveInfo = allMoves.find((move) => move.name === row.name)
    moves[index] = moveInfo ?? null
  })

  return moves
}

const buildPokemonStats = async (pcId: number) => {
  const { results } = await runQuery(
    `
        SELECT * FROM pokemon_pc_stats
        where pokemon_pc_stats.pc_id = $pcId
      `,
    { pcId }
  )

  return {
    hp: {
      base: results[0].hp,
      maxEvs: results[0].hp_evs,
    },
    attack: {
      base: results[0].attack,
      maxEvs: results[0].attack_evs,
    },
    defense: {
      base: results[0].defense,
      maxEvs: results[0].defense_evs,
    },
    specialAttack: {
      base: results[0].special_attack,
      maxEvs: results[0].special_attack_evs,
    },
    specialDefense: {
      base: results[0].special_defense,
      maxEvs: results[0].special_defense_evs,
    },
    speed: {
      base: results[0].speed,
      maxEvs: results[0].speed_evs,
    },
  }
}

const getPokemonsFromDB = async (userId: number) => {
  const res = await runQuery(
    `
      SELECT * FROM pokemon_pc
      left join pokemon_pc_stats on pokemon_pc_stats.pc_id = pokemon_pc.pc_id
      where pokemon_pc.user_id = $userId;
    `,
    { userId }
  )

  return res.results
}
