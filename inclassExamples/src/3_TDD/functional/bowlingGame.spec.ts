import { createBowlingGame, Game } from "./bowlingGame";

describe('Test bowling game', () => {
  let game: Game
  beforeEach(() => {
    game = createBowlingGame()
  })

  test('all zeros', () => {
    game = rollMany(20, 0);

    expect(game.score()).toBe(0);
  })

  test('all ones', () => {
    game = rollMany(20, 1);

    expect(game.score()).toBe(20);
  })

  test('spare', () => {
    game = rollSpare()
    game = game.roll(3);
    game = rollMany(17, 0);

    expect(game.score()).toBe(16)
  })

  test('strike', () => {
    game = rollStrike()
    game = game.roll(3).roll(3)
    game = rollMany(16, 0);

    expect(game.score()).toBe(22)
  })

  test('all strikes', () => {
    game = rollMany(12, 10);

    expect(game.score()).toBe(300);
  })


  function rollStrike() {
    return game.roll(10);
  }

  function rollSpare() {
    return game.roll(5).roll(5)
  }

  function rollMany(rolls: number, pins: number) {
    for (let i = 0; i < rolls; i++) {
      game = game.roll(pins)
    }

    return game;
  }
});


