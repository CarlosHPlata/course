import { BowlingGame } from "./bowling";


describe('A bowling game', () => {
    
  let game:BowlingGame
  beforeEach(() => {
    game = new BowlingGame()
  });

  it('can play a gutter game', () =>{
    rollMany(game, 20, 0)

    expect( game.GetScore() ).toBe(0)
  })

  it('can roll a game with all ones', () =>{
    rollMany(game, 20, 1);

    expect( game.GetScore() ).toBe( 20 )
  })

  it('can roll a spare', () =>{
    rollSpare(game)
    game.Roll(3)

    rollMany(game, 17, 0)

    expect( game.GetScore() ).toBe(16)
  })

  it('can roll a strike', () =>{
    rollStrike(game)
    game.Roll(1)
    game.Roll(1)

    rollMany(game, 16, 0)

    expect( game.GetScore() ).toBe(14)
  })

  it('can roll perfect game', () =>{
    rollMany(game, 12, 10)

    expect( game.GetScore() ).toBe(300)
})

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

