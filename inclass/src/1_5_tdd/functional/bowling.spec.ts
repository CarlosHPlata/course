import { createGame, Game } from "./bowling";

describe('A bowling game', () => {

  let game: Game
  beforeEach(() => {
    game = createGame()
  })

  it('can play a gutter game', () => {
    game = rollMany(game, 20, 0)

    expect( game.score() ).toBe( 0 )
  })

  it('can roll a game with all ones', () => {
    game = rollMany(game, 20, 1)

    expect( game.score() ).toBe( 20 )
  });

  it('can roll a spare', () => {
    game = rollSpare(game) 
          .roll(3) 
    
    game = rollMany(game, 17, 0)

    expect( game.score() ).toBe(16)
  });

  it('can roll a strike', () => {
    game = rollStrike(game)
      .roll(1)
      .roll(1)

    game = rollMany(game, 16, 0)

    expect( game.score() ).toBe(14)
  });

  it('can roll perfect game', () => {
    game = rollMany(game, 12, 10)

    expect( game.score() ).toBe(300)
  });

});

function rollStrike(game: Game) {
  return game.roll(10);
}

function rollSpare(game: Game) {
  return game.roll(5)
    .roll(5);
}

function rollMany(game: Game, rolls: number, pins: number) {
  for (let i = 0; i < rolls; i++) {
    game = game.roll(pins);
  }
  return game;
}

