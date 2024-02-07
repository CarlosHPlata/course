import { BowlingGame, createBowlingGame } from './bowlingGame';

describe('Test Bowling Game Functional', () => {
    let game: BowlingGame
    beforeEach(() => {
    game = createBowlingGame();
  });

  it('should roll a gutter game', () => {
    game = rollMany(game, 20, 0);
    expect(game.score()).toBe(0);
  });

  it('should roll all ones', () => {
    game = rollMany(game, 20, 1);
    expect(game.score()).toBe(20);
  })

  it('should roll a spare', () => {
    game = rollSpare(game);
    game = game.roll(3)

    game = rollMany(game, 17, 0);
    expect(game.score()).toBe(16);
  })

  it('should roll a strike', () => {
    game = rollStrike(game);
    game = rollMany(game, 16, 0);
    expect(game.score()).toBe(22);
  })

  it('should do a perfect game', () => {
    game = rollMany(game, 12, 10);
    expect(game.score()).toBe(300);
  })
});


function rollStrike(game: BowlingGame) {
  return game.roll(10).roll(3).roll(3);
}

function rollSpare(game: BowlingGame) {
  return game.roll(5).roll(5);
}

function rollMany(game: BowlingGame, rolls: number, pins: number) {
  for (let i = 0; i < rolls; i++) {
    game = game.roll(pins);
  }
  return game;
}