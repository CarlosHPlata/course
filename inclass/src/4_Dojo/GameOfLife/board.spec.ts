import { createBoard } from "./board";
import { Cell } from "./models/Cell";


describe('Board testing', () => {

  let board: ReturnType<typeof createBoard>
  beforeEach(() => {
    board = createBoard()
  })

  it("create cells", () => {

    const cell: Cell = [1, 2];
    board.addCell(cell);
    const isLive: boolean = board.isAlive(cell);

    expect(isLive).toBeTruthy()
  })

  it('should check if a cell is dead ', () => {
    const cell: Cell = [1, 2];
    board.addCell(cell);
    const isLive: boolean = board.isAlive([2, 3]);

    expect(isLive).toBeFalsy()
  });

  it('should get live cell neighbours ', () => {
    const cell: Cell = [1, 2];
    const cell_neighbour: Cell = [1, 3];

    board.addCell(cell);
    board.addCell(cell_neighbour);

    const have_neighbour: boolean = board.getNeighbours(cell).has(cell_neighbour);
    expect(have_neighbour).toBeTruthy()
  });

  it('shouldnt find not neighbour cells', () => {
    const cell: Cell = [1, 2];
    const not_neighbour: Cell = [9, 9];

    board.addCell(cell);
    board.addCell(not_neighbour);

    const have_neighbour: boolean = board.getNeighbours(cell).has(not_neighbour);
    expect(have_neighbour).toBeFalsy()
  });
});