import PokemonEncounter from './PokemonEncounter'
import { TrainerRepository } from './TrainerRepository'
import { Pokemon } from './dtos/pokemon.dto'
import { getRandomHit } from './utils'

export class Capturer {
  private trainerId: number | undefined
  private readonly trainerRepository: TrainerRepository

  constructor(trainerRepository: TrainerRepository) {
    this.trainerRepository = trainerRepository
  }

  public withId(trainerId: number) {
    this.trainerId = trainerId
    return this
  }

  public async tryCapture(wildPokemon: Pokemon) {
    const canBeCaptured = this.canBeCaptured(wildPokemon)
    let pcId: number | undefined

    if (canBeCaptured) {
      const capturedPokemon = await this.capturePokemon(wildPokemon)
      pcId = capturedPokemon.pcId
    }

    return { captured: canBeCaptured, pcId }
  }

  private canBeCaptured(wildPokemon: Pokemon) {
    const pokemonEncounter = new PokemonEncounter(wildPokemon)

    return pokemonEncounter.canCaptureIt(getRandomHit())
  }

  private async capturePokemon(wildPokemon: Pokemon) {
    if (this.trainerId == null) throw new Error('trainer id not defined')

    return await this.trainerRepository.capturePokemon(this.trainerId, wildPokemon)

  }

}
