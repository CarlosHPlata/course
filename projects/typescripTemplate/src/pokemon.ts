export type Pokemon = {
  name: string,
  type: 'fire' | 'electric' | 'fly',
  attack: number,
}

export const printPokemon = ({ name }: Pokemon) => {
  return `${name} I choose you`;;
}