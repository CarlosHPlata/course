import { Cell, newBoard } from './board'

describe('Testing the board module', () => {
  it('Calling "newBoard" without arguments should create a new empty board', () => {
    const res = newBoard()

    expect(res).toBeDefined()
  })

  it('Calling "add" method with a new Cell', () => {
    const newCell: Cell = { x: 0, y: 0 }
    const board = newBoard()
    board.add(newCell)

    expect(board.isAlive(newCell)).toBeTruthy()
  })

  it('Calling "get" method with a non existing Cell', () => {
    const newCell: Cell = { x: 0, y: 0 }

    const board = newBoard()
    expect(board.isAlive(newCell)).toBeFalsy()
  })
  it('Calling "getNeighbours" method return an array of cells', () => {
    const cell: Cell = { x: 0, y: 0 }
    const neighbourCell: Cell = { x: 1, y: 0 }

    const board = newBoard()
    board.add(cell)
    board.add(neighbourCell)
    expect(board.getNeighbours(cell)).toContainEqual(neighbourCell)
  })

  it('Calling "getNeighbours" method must not contain the current cell', () => {
    const cell: Cell = { x: 0, y: 0 }

    const board = newBoard()
    board.add(cell)
    expect(board.getNeighbours(cell)).not.toContainEqual(cell)
  })

  it('Calling "getNeighbours" method must not contain the current cell', () => {
    const cell: Cell = { x: 0, y: 0 }
    const notNeighbourCell: Cell = { x: 2, y: 0 }
    const board = newBoard()
    board.add(notNeighbourCell)
    board.add(cell)
    expect(board.getNeighbours(cell)).not.toContainEqual(notNeighbourCell)
  })
})
