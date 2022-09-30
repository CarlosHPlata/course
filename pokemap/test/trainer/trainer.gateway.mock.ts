import { GarchompMock } from '@test/pokemon/mocks/pokemon.mock'

const pokemons = [GarchompMock]

export const trainerGatewayMock = {
  getTrainerById: jest.fn((id: number) =>
    Promise.resolve({ id, name: 'test' })
  ),
  getPokemonsFromTrainer: jest.fn(() => Promise.resolve(pokemons)),
  savePokemon: jest.fn((id, pokemon) =>
    Promise.resolve({ ...pokemon, pcId: 1 })
  ),
}
