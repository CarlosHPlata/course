import { createBowlingGame } from "./bowlingGame";

type Game = ReturnType<typeof createBowlingGame>;

describe("Test Bowling Game Functional", () => {
  let game: Game;

  beforeEach(() => {
    game = createBowlingGame();
  });

  it("Should roll a gutter game", () => {
    game = rollMany(game, 20, 0);

    expect(game.getScore()).toBe(0);
  });

  it("Should roll all ones", () => {
    game = rollMany(game, 20, 1);

    expect(game.getScore()).toBe(20);
  });

  it("Should roll a spare", () => {
    game = rollSpare(game);

    game = game.roll(3);

    game = rollMany(game, 17, 0);

    expect(game.getScore()).toBe(16);
  });

  it("Should roll a strike", () => {
    game = game.roll(10).roll(3).roll(3);

    game = rollMany(game, 16, 0);

    expect(game.getScore()).toBe(22);
  });

  it("Should do a perfect game", () => {
    game = rollMany(game, 12, 10);

    expect(game.getScore()).toBe(300);
  });
});

const rollSpare = (game: Game) => {
  return game.roll(5).roll(5);
};

const rollMany = (game: Game, rolls: number, pins: number) => {
  for (let i = 0; i < rolls; i++) {
    game = game.roll(pins);
  }

  return game;
};
