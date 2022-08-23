const pokemon = {
  id: 1,
  speed: 20,
  isGiga: false,
  isMega: true,
  isLegendary: true,
}
const trainer = { getPc: () => ({ getPCSlots: () => [{ pokemon }] }) }

class Attack {
  public readonly BASE_ATTACK = 20
  public attackSpeed: number
  
  constructor(pokemonSpeed: number){
    this.attackSpeed = pokemonSpeed * 2
  }
  
  public getDamage(type) {
    switch(type) {
      case 'NORMAL':
        	return this.attackSpeed * this.BASE_ATTACK
      case 'MEGA':
        	return (this.attackSpeed * 40) * this.BASE_ATTACK
      case 'GIGAMAX':
        	return this.attackSpeed + this.BASE_ATTACK < 100
            ? this.attackSpeed * this.BASE_ATTACK + 100
          	: this.BASE_ATTACK
    }
  }
  
}

const performAttack =  (trainer, pokemonId) => {
  const pokemon = trainer
  	.getPc().
  	getPCSlots()
  	.find(slot => slot.pokemon.id === pokemonId)
  	.pokemon
  
  const attack = new Attack(pokemon.speed)
  return attack.attackSpeed * attack.BASE_ATTACK
}




console.log(performAttack(trainer, 1))