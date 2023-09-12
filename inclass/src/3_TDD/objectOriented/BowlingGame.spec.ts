import { BowlingGame } from "./BowlingGame";

describe('Test Bowling Game Functionality', () => {

  let game: BowlingGame;

  beforeEach(() => {
    game = new BowlingGame()
  });

  it('can throw a ball', () => {
    game.roll(0);

    expect(game).toBeDefined();
  });

  it('should calculate score with all zero', () => {
    rollMany(game, 20, 0);

    expect(game.score()).toBe(0);
  });

  it('should calculate score with all one', () => {
    rollMany(game, 20, 1);

    expect(game.score()).toBe(20);
  });

  it('can roll a spare', () => {
    rollSpare(game).roll(3);
    rollMany(game, 17, 0);

    expect(game.score()).toBe(16);
  });

  it('can roll a strike', () => {
    rollStrike(game).roll(2).roll(2);
    rollMany(game, 16, 0);

    expect(game.score()).toBe(18);
  });

  it('roll a perfect game', () => {
    rollMany(game, 12, 10);

    expect(game.score()).toBe(300);
  });

});

function rollStrike(game: BowlingGame) {
  return game.roll(10);
}

function rollSpare(game: BowlingGame) {
  return game.roll(5).roll(5);
}

function rollMany(game: BowlingGame, rolls: number, pins: number) {
  for (let i = 0; i < rolls; i++) {
    game.roll(pins);
  }
}