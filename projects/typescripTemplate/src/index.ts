import { printPokemon } from './pokemon'

const message = printPokemon({ name: 'pikachu', type: 'electric', attack: 9 })
console.log(message)