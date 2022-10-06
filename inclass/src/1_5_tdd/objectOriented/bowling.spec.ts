import { BowlingGame } from "./bowling";


describe('A bowling game', () => {
  
  beforeEach
  let game:BowlingGame
  beforeEach(() => {
    game = new BowlingGame()
  });

  it('can roll a gutter game', () =>{
// roll all 0s
    RollMany(20, 0)
    expect(game.Score()).toBe(0)
  })

  it('can roll all 1s', () =>{
    RollMany(20, 1)
    expect(game.Score()).toBe(20)
  })

  it('can roll a spare', () =>{
    game.Roll(5)
    game.Roll(5)
    game.Roll(3)
    RollMany(17, 0)

    expect(game.Score()).toBe(16)
  })

  it('can roll a Strike', () =>{
    game.Roll(10)
    game.Roll(1)
    game.Roll(1)
    RollMany(16,0)

    expect(game.Score()).toBe(14)
  })

  it('can roll a perfect game', () =>{
  //roll all 10s
    RollMany(12, 10)
    
    expect(game.Score()).toBe(300)
  })

  function RollMany(rolls:number, pins:number){
    for (let i = 0; i < rolls; i++) {
      game.Roll(pins); 
    }
  }
});

function rollStrike(game: BowlingGame) {
  return game.Roll(10);
}

function rollSpare(game: BowlingGame) {
  game.Roll(5)
  return game.Roll(5)
}

function rollMany(game: BowlingGame, rolls: number, pins: number) {
  for (let i = 0; i < rolls; i++) {
    game.Roll(pins);
  }
}

