import { Gender, Pokemon } from '../../pokemon'
import { buildQueryString, runQuery, runTransaction } from '../../dbcon'
import { Trainer } from '../domain/dtos'
import { ITrainerGateway } from '../domain/interfaces/trainer.gateway'
import { mapPokemonRes } from './mappers/pokemonMap'

export const trainerGateway: ITrainerGateway = {
  getTrainerById: (id: number): Promise<Trainer> =>
    Promise.resolve({ id, name: 'Ash ketchup' }),

  getPokemonsFromTrainer: (id: number): Promise<Pokemon[]> =>
    getPokemonsFromDb(id),

  savePokemon: (id: number, pokemon: Pokemon): Promise<Pokemon> =>
    savePokemonInDb(id, pokemon),
}

const getPokemonsFromDb = async (userId: number): Promise<Pokemon[]> => {
  const res = await runQuery(
    `
    SELECT * FROM pokemon_pc
    left join pokemon_pc_moves on pokemon_pc_moves.pc_id = pokemon_pc.pc_id
    left join pokemon_pc_stats on pokemon_pc_stats.pc_id = pokemon_pc.pc_id
    where pokemon_pc.user_id = $userId;
  `,
    { userId }
  )

  return mapPokemonRes(res.results)
}

const savePokemonInDb = async (userId: number, pokemon: Pokemon) => {
  const selRes = await runQuery(`
    SELECT 
      MAX(pc_id)+1 as pc_id
    FROM
      pokemon_pc;
  `)

  const pc_id = selRes.results[0] ? selRes.results[0].pc_id : 1
  console.log(selRes.results[0].pc_id)
  pokemon.pcId = pc_id

  const savePokemonQuery = createSavePokemonQuery(userId, pokemon)
  const savePokemonStatsQuery = createSavePokemonStatsQuery(pokemon)
  const movesQueries = createPokemonMovesQueries(pokemon)

  console.log(savePokemonQuery)

  await runTransaction([
    savePokemonQuery,
    savePokemonStatsQuery,
    ...movesQueries,
  ])

  return pokemon
}

const createSavePokemonQuery = (userId: number, pokemon: Pokemon) =>
  buildQueryString(
    `
  INSERT INTO pokemon_pc
  ( pc_id, custom_name, is_male, is_shiny, user_id, pokemon_id )
  VALUES ( $pcId, $customName, $isMale, $isShiny, $userId, $pokemonId );
`,
    {
      pcId: pokemon.pcId ?? 1,
      customName: pokemon.customName ?? '',
      isMale: pokemon.gender === Gender.MALE,
      isShiny: !!pokemon.isShiny,
      userId,
      pokemonId: pokemon.id,
    }
  )

const createSavePokemonStatsQuery = ({ stats, pcId }: Pokemon) =>
  buildQueryString(
    `
  INSERT INTO pokemon_pc_stats 
  (pc_id, hp, attack, defense, special_attack, special_defense, speed, hp_evs, attack_evs, 
  defense_evs, special_attack_evs, special_defense_evs, speed_evs ) 
  VALUES ($pcId, $hp, $attack, $defense, $specialAttack, $specialDefense, $speed, $hpEvs, $attackEvs, $defenseEvs, $sAttackEvs, $sDefenseEvs, $speedEvs);
`,
    {
      pcId: pcId ?? 1,
      hp: stats.hp.base,
      attack: stats.attack.base,
      defense: stats.defense.base,
      specialAttack: stats.specialAttack.base,
      specialDefense: stats.specialDefense.base,
      speed: stats.speed.base,
      hpEvs: stats.hp.maxEvs,
      attackEvs: stats.attack.maxEvs,
      defenseEvs: stats.defense.maxEvs,
      sAttackEvs: stats.specialAttack.maxEvs,
      sDefenseEvs: stats.specialDefense.maxEvs,
      speedEvs: stats.speed.maxEvs,
    }
  )

const createPokemonMovesQueries = ({ moves, pcId }: Pokemon): string[] => {
  const queries: string[] = []

  moves
    .filter((m) => m != null)
    .forEach((move) => {
      const savePokemonMovesQuery = buildQueryString(
        `
      INSERT INTO pokemon_pc_moves
      (pc_id, name) VALUES
      ($pcId, $name);
    `,
        {
          pcId: pcId ?? 1,
          name: move?.name ?? '',
        }
      )

      queries.push(savePokemonMovesQuery)
    })

  return queries
}
