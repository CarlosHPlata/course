# The game of life

The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.

One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.

## Rules

The universe of the Game of Life is an `infinite`, two-dimensional grid of square cells, each of which is in one of two possible states:

- live
- dead.

Every cell interacts with its `8 live neighbours`, which are the cells that are horizontally, vertically, or diagonally adjacent.

At each step in time, the following transitions occur:

- Any live cell with `2` or `3` live neighbours **lives**.
  - Any live cell with less than `2` live neighbours **dies**.
  - Any live cell with more than three live neighbours **dies**.
- Any dead cell with exactly `3` live neighbours becomes a **live** cell.

## Excercise

There should exists at least 2 entities.

- a `board`:
  It will contain a grid of infinite cells, you can add live cells, and it should have a method to get the next iteration.

  - The board should be inmutable

- a `game` should have a board instances and perform several iterations of the life game.
