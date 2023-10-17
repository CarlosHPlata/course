import { Cell } from "./models/Cell"
import { CellSet } from "./models/CellSet"


export function createBoard(cells: Set<Cell> = new CellSet()): Board {
  return {
    addCell: (cell: Cell) => addCell(cells, cell),
    isAlive: (cell: Cell) => isAlive(cells, cell),
    getNeighbours: (cell: Cell) => getNeighbours(cells, cell),
    goNext: () => goNext(cells)
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
      if (i == 0 && k == 0) continue;
      if (isAlive(cells, [x + i, y + k]))
        neighbours.add([x + i, y + k])
    }
  }

  return neighbours;
}

const goNext = (cells: Set<Cell>) => {
  const newBoard = createBoard();

  cells.forEach(cell => {

    const [x, y] = cell

    for (let i = -1; i <= 1; i++) {
      for (let k = -1; k <= 1; k++) {
        const currentCell: Cell = [x + i, y + k]

        const neighbourSize = getNeighbours(cells, currentCell).size

        if (
          (neighbourSize == 2 && isAlive(cells, currentCell))
          || neighbourSize == 3
        )
          newBoard.addCell(currentCell)
      }
    }


  })

  return newBoard
}

export type Board = {
  addCell: (cell: Cell) => void;
  isAlive: (cell: Cell) => boolean;
  getNeighbours: (cell: Cell) => Set<Cell>;
  goNext: () => Board;
}
//