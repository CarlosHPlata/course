import { Family } from '../dtos'
import { MAX_RANDOM_HIT_VALUE } from '../utils/constants'

export type FamiliesInZone = { family: Family; probability: number }

export default class Zone {
  public static ENCOUNTER_PROB = 40

  constructor(
    private _name: string,
    private familiesInZone: FamiliesInZone[]
  ) {}

  public isEncounterPossible(randomProbabilityHit: number): boolean {
    if (randomProbabilityHit <= Zone.ENCOUNTER_PROB) {
      return true
    }

    return false
  }

  public generateFamilyEncounter(probabilityHit: number): Family {
    const famInZone = this.getFamilyFromProbability(probabilityHit)
    return famInZone.family
  }

  public get name(): string {
    return this._name
  }

  private getFamilyFromProbability(probability: number): FamiliesInZone {
    const maxProbabilityRange = this.calculateFamilyProbabilityRange()

    let minProbability = 0
    const familyInZone = this.familiesInZone.find((famInZone) => {
      const currValue = famInZone.probability
      const maxProbability =
        minProbability +
        this.calculateHitInMaxProbabilityAllowed(currValue, maxProbabilityRange)

      if (probability > minProbability && probability <= maxProbability)
        return true

      minProbability = maxProbability
      return false
    })

    return familyInZone ?? this.familiesInZone[0]
  }

  private calculateHitInMaxProbabilityAllowed(
    currValue: number,
    maxProbabilityRange: number
  ) {
    return Math.floor((currValue * MAX_RANDOM_HIT_VALUE) / maxProbabilityRange)
  }

  private calculateFamilyProbabilityRange() {
    return this.familiesInZone.reduce(
      (sum, family) => sum + family.probability,
      0
    )
  }
}
