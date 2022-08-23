const pokemon = {
  id: 1,
  speed: 20,
  isGiga: true,
  isMega: false,
  isLegendary: true,
}
const trainer = {
  getPokemon: (id) => pokemon,
  getPc: () => ({ getPCSlots: () => [{ pokemon }] }),
   }

abstract class  Attack {
  protected readonly BASE_ATTACK = 20
  protected attackSpeed: number
  
  constructor(pokemonSpeed: number){
    this.attackSpeed = pokemonSpeed * 2
  }
  
  public abstract getDamage();
  
}

class NormalAttack extends Attack {
  public getDamage() {
    return this.attackSpeed * this.BASE_ATTACK
  }
}

class MegaAttack extends Attack {
  public getDamage() {
    return (this.attackSpeed * 40) * this.BASE_ATTACK
  }
}

class GigaAttack extends Attack {
  public getDamage() {
    return this.attackSpeed + this.BASE_ATTACK < 100
            ? this.attackSpeed * this.BASE_ATTACK + 100
          	: this.BASE_ATTACK
  }
}

class LegendaryAttack extends Attack {
  public getDamage() {
    return this.BASE_ATTACK * 2
  }
}

const attackFactory = (pokemon): Attack => {
  if (pokemon.isLegendary) return new LegendaryAttack(pokemon.speed)
  if (pokemon.isMega) return new MegaAttack(pokemon.speed)
  if (pokemon.isGiga) return new MegaAttack(pokemon.speed)
  
  return new NormalAttack(pokemon.speed)
}

const performAttack =  (trainer, pokemonId) => {
  const pokemon = trainer.getPokemon(pokemonId)
  
  const attack: Attack = attackFactory(pokemon)
  return attack.getDamage()
}




console.log(performAttack(trainer, 1))