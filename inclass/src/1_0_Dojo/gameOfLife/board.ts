export type Cell = {
  x: number
  y: number
}

export const newBoard = () => {
  const cells: Cell[] = []
  return {
    add: (cell: Cell) => cells.push(cell),
    isAlive: (cell: Cell) => isAlive(cell, cells),
    getNeighbours: (cell: Cell) => getNeighbours(cell, cells),
  }
}

const getNeighbours = (cell: Cell, cells: Cell[]) => {
  const neighbours: Cell[] = []
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      const neighbour = { x: cell.x + x, y: cell.y + y }
      if (isAlive(neighbour, cells) && !isSameCell(neighbour, cell)) {
        neighbours.push(neighbour)
      }
    }
  }

  return neighbours
}

const isAlive = (cell: Cell, cells: Cell[]) =>
  cells.find((current) => isSameCell(current, cell))

const isSameCell = (current: Cell, cell: Cell) =>
  current.x === cell.x && current.y === cell.y
