export class BowlingGame {
    private rolls: number[]
    score: number

    constructor(){
        this.rolls = []
        this.score = 0
    }

    Roll(pins:number){
        this.rolls.push(pins);
    }

    Score(){
        let RollIndex = 0
        for (let i = 0; i < 10; i++) {
            if(isStrike(this.rolls, i)){
                this.score += 10 + StrikeBonus(this.rolls, RollIndex)
                RollIndex++
            }else if(isSpare(this.rolls, i)){
                this.score += 10 + SpareBonus(this.rolls, RollIndex)
                RollIndex += 2
            }else{
                this.score += BallsInFrame(this.rolls, RollIndex)
                RollIndex += 2
            }         
        }
        return this.score
    }
    
}

const BallsInFrame = (rolls: number[], firstinFrame: number) =>{
    return rolls[firstinFrame] + rolls[firstinFrame + 1]
}

function isSpare(rolls: number[], frameIndex:number) {
    return rolls[frameIndex] + rolls[frameIndex + 1] == 10
}

const SpareBonus = (rolls: number[], firstinFrame: number) =>{
    return rolls[firstinFrame + 2]
}

function isStrike(rolls: number[], frameIndex:number){
    return rolls[frameIndex] == 10
}

const StrikeBonus = (rolls: number[], firstinFrame: number) =>{
    return rolls[firstinFrame + 1] + rolls[firstinFrame + 2]
}
