import PokemonEncounter from './PokemonEncounter'
import { TrainerStore } from './TrainerStore'
import { Pokemon } from './dtos/pokemon.dto'

export class Capturer {
  private trainerId: number | undefined

  withId(trainerId: number) {
    this.trainerId = trainerId
    return this
  }

  async tryCapture(wildPokemon: Pokemon) {
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

    const hit = this.getRandomHit()
    const canBeCaptured = pokemonEncounter.canCaptureIt(hit)

    return canBeCaptured
  }

  private async capturePokemon(wildPokemon: Pokemon) {
    if (this.trainerId == null) throw new Error('trainer id not defined')

    const trainerStore = new TrainerStore()
    return await trainerStore.savePokemon(this.trainerId, wildPokemon)
  }

  private getRandomHit() {
    const min = 1
    const max = 100
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
