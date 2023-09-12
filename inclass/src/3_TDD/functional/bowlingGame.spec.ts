import { Game, createBowlingGame } from "./bowlingGame";

describe('Test bowling game', () => {

  let game: Game
  beforeEach(() => {
    game = createBowlingGame()
  });

  it('can trhow a ball', () => {
    game = game.roll(0)

    expect(game).toBeDefined()
  });


  it('should calculate score with all zero', () => {
    game = rollMany(game, 20, 0);

    expect(game.score()).toBe(0)
  });

  it('should calculate score with all one', () => {
    game = rollMany(game, 20, 1);

    expect(game.score()).toBe(20)
  });

  it('can roll a spare ', () => {
    game = rollSpare(game)
      .roll(3)

    game = rollMany(game, 17, 0);

    expect(game.score()).toBe(16)
  });

  it('can roll a strike', () => {
    game = rollStrike(game)
      .roll(2)
      .roll(2)

    game = rollMany(game, 16, 0);

    expect(game.score()).toBe(18)
  });

  it('roll a perfect game', () => {
    game = rollMany(game, 12, 10);

    expect(game.score()).toBe(300)
  });

});

function rollStrike(game) {
  return game.roll(10)
}

function rollSpare(game) {
  return game.roll(5).roll(5)
}

function rollMany(game: Game, rolls: number, pins: number) {
  for (let i = 0; i < rolls; i++) {
    game = game.roll(pins);
  }

  return game;
}
