import Zone, { FamiliesInZone } from './zone'
import { PokemonDto } from '../dtos'

describe('When testing Zone', () => {
  describe('at knowing if a encounter is possible', () => {
    let zone: Zone

    it('should respond with a true when probability of encounter match', () => {
      expect(zone.isEncounterPossible(Zone.ENCOUNTER_PROB - 1)).toBeTruthy()
    })

    it('should respond with a false when probability of encounter not match ', () => {
      expect(zone.isEncounterPossible(Zone.ENCOUNTER_PROB + 1)).toBeFalsy()
    })

    beforeEach(() => {
      zone = makeZone()
    })
  })

  describe('at generating an encounter', () => {
    const STARTERS_PROBABILITY = 30
    const FIRE_FAMILY_PROBABILITY = 70
    const POBABILITY_FOR_FIRE_TYPE_TO_APPEAR = 31

    it('should return a random pokemon family based on the probability of that family to appear', () => {
      const starters: FamiliesInZone = {
        family: [makePokemon('pikachu')],
        probability: STARTERS_PROBABILITY,
      }

      const fireType: FamiliesInZone = {
        family: [makePokemon('charmander')],
        probability: FIRE_FAMILY_PROBABILITY,
      }

      const zone = makeZone({ families: [starters, fireType] })

      expect(
        zone.generateFamilyEncounter(POBABILITY_FOR_FIRE_TYPE_TO_APPEAR)
      ).toBe(fireType.family)
    })
  })
})

const makeZone = (atr?: { name?: string; families?: FamiliesInZone[] }) =>
  new Zone(atr?.name ?? 'test', atr?.families ?? [])

const makePokemon = (name: string): PokemonDto => ({ id: 1, name })
