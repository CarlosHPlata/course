import { Cell } from '../models/Cell'
import { CellSet } from '../models/CellSet'

const seeds = new Map([
  [
    'penta',
    `..O....O..
OO.OOOO.OO
..O....O..`,
  ],

  ['blinker', '.....\n.OOO.\n.....'],

  [
    'pulsar',
    `..OOO...OOO..
.............
O....O.O....O
O....O.O....O
O....O.O....O
..OOO...OOO..
.............
..OOO...OOO..
O....O.O....O
O....O.O....O
O....O.O....O
.............
..OOO...OOO..`,
  ],

  [
    'shotgun',
    `........................O...........
......................O.O...........
............OO......OO............OO
...........O...O....OO............OO
OO........O.....O...OO..............
OO........O...O.OO....O.O...........
..........O.....O.......O...........
...........O...O....................
............OO......................`,
  ],
])

const stringToSeed = (pattern: string): Set<Cell> => {
  const cells = new CellSet()
  const rows = pattern.split('\n')
  let y = -1 * Math.floor(rows.length / 2) - 1

  rows.forEach((row) => {
    const cols = row.split('')
    let x = -1 * Math.floor(cols.length / 2) - 1
    cols.forEach((col) => {
      if (col === 'O') {
        cells.add([x + 1, y + 1])
      }
      x++
    })
    y++
  })

  return cells
}

export const seed = (seedName: 'pulsar' | 'penta' | 'blinker' | 'shotgun') =>
  stringToSeed(seeds.get(seedName))


