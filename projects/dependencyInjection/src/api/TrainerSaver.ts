import { InjectableSolid } from '../injectionLibrary/InjectableSolid'
import { TrainerRepository } from './TrainerRepository'
import { buildQueryString, runQuery, runTransaction } from './databaseConnections/dbcon'
import { Gender, Pokemon } from './dtos/pokemon.dto'

@InjectableSolid('TrainerRepository')
export class TrainerSaver implements TrainerRepository {

  private readonly prop: string = ''

  async capturePokemon(trainerId: number, wildPokemon: Pokemon): Promise<Pokemon> {
    wildPokemon.pcId = await this.getNewPcId()

    const savePokemonQuery = this.createSavePokemonQuery(trainerId, wildPokemon)
    const savePokemonStatsQuery = this.createSavePokemonStatsQuery(wildPokemon)
    const movesQueries = this.createPokemonMovesQueries(wildPokemon)

    await runTransaction([
      savePokemonQuery,
      savePokemonStatsQuery,
      ...movesQueries
    ])

    return wildPokemon
  }

  private async getNewPcId(): Promise<number> {
    const selRes = await runQuery(`
      SELECT 
        MAX(pc_id)+1 as pc_id
      FROM
        pokemon_pc;
    `)
    console.log(selRes.results[0].pc_id)

    return selRes.results[0] !== null ? selRes.results[0].pc_id : 1
  }


  private createSavePokemonQuery(userId: number, pokemon: Pokemon) {
    return buildQueryString(
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
        pokemonId: pokemon.id
      }
    )
  }


  private createSavePokemonStatsQuery({ stats, pcId }: Pokemon) {
    return buildQueryString(
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
        speedEvs: stats.speed.maxEvs
      }
    )
  }

  private createPokemonMovesQueries({ moves, pcId }: Pokemon): string[] {
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
            name: move?.name ?? ''
          }
        )

        queries.push(savePokemonMovesQuery)
      })

    return queries
  }


}
