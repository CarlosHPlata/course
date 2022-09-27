export class BowlingGame {

  private rolls: number[]
  private score: number

  constructor(){
      this.rolls = new Array<number>()
      this.score = 0
  }

  Roll(pin: number): void{
      this.rolls.push(pin)
  }

  GetScore(): number{
      let i = 0
      for (let frame = 0; frame < 10; frame++) {
          if(isStrike(this.rolls, i)){
              this.score += 10 + nextTwoBallsForStrike(this.rolls, i)
              i++;
              continue;

          }
          if(isSpare(this.rolls, i)){
              this.score += 10 + nextBallForSpare(this.rolls, i)
              i += 2

          }else{
              this.score += ballsInFrame(this.rolls, i)
              i += 2

          }
      }

      return this.score
  }
}

const ballsInFrame = (rolls: number[], firstInFrame: number) =>{
  return rolls[firstInFrame] + rolls[firstInFrame+1]
}

const nextBallForSpare = (rolls: number[], firstInFrame: number) =>{
  return rolls[firstInFrame+2]
}

const nextTwoBallsForStrike = (rolls: number[], firstInFrame: number) =>{
  return rolls[firstInFrame+1] + rolls[firstInFrame+2]
}

function isStrike(rolls: number[], firstInFrame: number) {
  return rolls[firstInFrame] == 10
}

function isSpare(rolls: number[], i: number) {
  return rolls[i] + rolls[i + 1] == 10
}