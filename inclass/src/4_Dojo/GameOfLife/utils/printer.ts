export const LIVE_CELL_CHAR = '██'//'■'
export const DEAD_CELL_CHAR = '  '//'□'

export const printGame = (board, size: [number, number]) => {
  const [maxColumns, maxRows] = size
  let screen = ''

  for (let x = -1 * maxRows; x <= maxRows; x++) {
    for (let y = -1 * maxColumns; y <= maxColumns; y++) {
      screen += board.isAlive([x, y]) ? LIVE_CELL_CHAR : DEAD_CELL_CHAR
    }

    screen += '\n'
  }

  console.clear()
  console.log(screen)
}

export type Printer = (board: any, size: [number, number]) => void