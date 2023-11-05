import { BowlingGame } from "./BowlingGame";

describe('Test Bowling Game Functionality', () => {

  let game;

  beforeEach(() => {
    game = new BowlingGame()
  });

  it('can trhow a ball', () => {
    game = game.roll(0)

    expect(game).toBeDefined()
  });


  it('should calculate score with all zero(gutterGame)', () => {
    game = rollMany(game, 20, 0);

    expect(game.score()).toBe(0)
  });

  it('should calculate score with all one', () => {
    game = rollMany(game, 20, 1);

    expect(game.score()).toBe(20)
  });

  it('can roll a spare and the rest are 0', () => {
    game = rollSpare(game)
    game = rollMany(game, 18, 0);

    expect(game.score()).toBe(10)
  });

  it('can roll a strike and the rest are 0', () => {
    game = rollStrike(game)
    game = rollMany(game, 18, 0);

    expect(game.score()).toBe(10)
  });

  it('roll a perfect game', () => {
    game = rollMany(game, 12, 10);

    expect(game.score()).toBe(300)
  });


});

function rollStrike(game: BowlingGame) {
  return game.roll(10)
}

function rollSpare(game: BowlingGame) {
  return game.roll(5).roll(5)
}

function rollMany(game: BowlingGame, rolls: number, pins: number) {
  for (let i = 0; i < rolls; i++) {
    game = game.roll(pins);
  }

  return game;
}