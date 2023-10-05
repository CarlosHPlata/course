import { Cell } from "./models/Cell"
import { CellSet } from "./models/CellSet"


export function createBoard() {
  let cells: Set<Cell> = new CellSet()

  return {
    addCell: (cell: Cell) => addCell(cells, cell),
    isAlive: (cell: Cell) => isAlive(cells, cell),
    getNeighbours: (cell: Cell) => getNeighbours(cells, cell)
  };
}

const addCell = (cells: Set<Cell>, cell: Cell) => {
  cells.add(cell);
}

const isAlive = (cells: Set<Cell>, cell: Cell) => {
  return cells.has(cell);
}

const getNeighbours = (cells: Set<Cell>, cell: Cell) => {
  const [x, y] = cell
  let neighbours: Set<Cell> = new CellSet()

  for (let i = -1; i <= 1; i++) {
    for (let k = -1; k <= 1; k++) {
      neighbours.add([x + i, y + k])
    }
  }

  return neighbours;
}
//