
export class BowlingGame {
    private rolls: number[] = []
    private readonly FRAMES = 10

    public roll(pins: number) {
        this.rolls.push(pins);
        return this;
    }

    public getScore() {
        let score = 0;
        let fristTry = 0;
        for (let frame = 0; frame < this.FRAMES; frame++) {
            if (this.isStrike(fristTry)) {
                score += this.scoreForStrike(fristTry)
                fristTry++
            } else if (this.isSpare(fristTry)) {
                score += this.scoreForSpare(fristTry)
                fristTry += 2
            } else {
                score += this.scoreForFrame(fristTry)
                fristTry += 2
            }
        }
        return score
    }
    
    private scoreForStrike(firstTry: number) {
        return  10 + this.rolls[firstTry + 1] + this.rolls[firstTry + 2];
    }

    private isStrike(firstTry: number) {
        return this.rolls[firstTry] == 10;
    }

    private scoreForFrame(firstTry: number) {
       return this.rolls[firstTry] + this.rolls[firstTry + 1]
    }

    private isSpare(firstTry: number) {
        return this.rolls[firstTry] + this.rolls[firstTry + 1] === 10;
    }

    private scoreForSpare(firstTry: number) {
        return 10+this.rolls[firstTry + 2];
    }
}
