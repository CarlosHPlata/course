/* === === === === === === === ===
 Mock data
=== === === === === === === === */
const pokemon = {
  id: 1,
  speed: 20,
  isGiga: false,
  isMega: true,
  isLegendary: true,
}
const trainer = {
  getPc: () => ({ getPCSlots: () => [{ pokemon }] }),
  getPokemon: (id) => pokemon,
}

/* === === === === === === === ===
 Attack class
=== === === === === === === === */
abstract class Attack {
  private readonly BASE_ATTACK = 20
  private attackSpeed: number

  constructor(pokemonSpeed: number) {
    this.attackSpeed = pokemonSpeed * 2
  }

  public abstract getDamage()
}

class NormalAttack extends Attack {
  public getDamage() {
    return this.attackSpeed * this.BASE_ATTACK
  }
}

class MegaAttack extends Attack {
  public getDamage() {
    return this.attackSpeed * 40 * this.BASE_ATTACK
  }
}

class GigaMaxAttack extends Attack {
  private readonly
  public getDamage() {
    return this.attackSpeed + this.BASE_ATTACK < 100
      ? this.attackSpeed * this.BASE_ATTACK + 100
      : this.BASE_ATTACK
  }
}

class SuperDuperLegendaryAttack extends Attack {
  public getDamage() {
    return this.BASE_ATTACK * 3
  }
}

const attackFactory = (pokemon): Attack => {
  if (pokemon.isGiga) return new GigaMaxAttack(pokemon.speed)
  if (pokemon.isMega) return new MegaAttack(pokemon.speed)
  if (pokemon.isLegendary) return new LegendaryAttack(pokemon.speed)

  return NormalAttack(pokemon.speed)
}

/* === === === === === === === ===
 Main function
=== === === === === === === === */
const performAttack = (trainer, pokemonId) => {
  const pokemon = trainer.getPokemon(pokemonId)

  const attack: Attack = attackFactory(pokemon)
  return attack.getDamage()
}

console.log(performAttack(trainer, 1))
