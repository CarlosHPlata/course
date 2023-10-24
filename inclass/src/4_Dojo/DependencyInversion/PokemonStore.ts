
class PokemonStore {

  getPokemonById(id) {
    //do something in the sql
    return {
      id,
      name: 'Pikachu',
      attack: 10,
      defense: 10
    }
  }

}

const store = new PokemonStore()
export default store