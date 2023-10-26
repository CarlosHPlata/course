import PokemonEncounter from './PokemonEncounter'
import { TrainerSaver } from './TrainerSaver'
import { runTransaction } from './databaseConnections/dbcon'
import { Pokemon } from './dtos/pokemon.dto'
import { getRandomHit } from './utils'

export class Capturer {
  private trainerId: number | undefined

  public withId(trainerId: number) {
    this.trainerId = trainerId
    return this
  }

  public async tryCapture(wildPokemon: Pokemon) {
    const canBeCaptured = this.canBeCaptured(wildPokemon)
    let pcId: number | undefined

    console.log('Pokemon can be captured ', canBeCaptured)
    if (canBeCaptured) {
      const capturedPokemon = await this.capturePokemon(wildPokemon)
      pcId = capturedPokemon.pcId
      console.log('pokemon captured in your PC, id is: ', pcId)
    }

    return { captured: canBeCaptured, pcId }
  }

  private canBeCaptured(wildPokemon: Pokemon) {
    const pokemonEncounter = new PokemonEncounter(wildPokemon)

    return pokemonEncounter.canCaptureIt(getRandomHit())
  }

  private async capturePokemon(wildPokemon: Pokemon) {
    if (this.trainerId == null) throw new Error('trainer id not defined')

    const trainerSaver = new TrainerSaver()
    wildPokemon.pcId = await trainerSaver.getNewPcId()

    const savePokemonQuery = trainerSaver.createSavePokemonQuery(this.trainerId, wildPokemon)
    const savePokemonStatsQuery = trainerSaver.createSavePokemonStatsQuery(wildPokemon)
    const movesQueries = trainerSaver.createPokemonMovesQueries(wildPokemon)

    await runTransaction([
      savePokemonQuery,
      savePokemonStatsQuery,
      ...movesQueries
    ])

    return wildPokemon
  }

}
