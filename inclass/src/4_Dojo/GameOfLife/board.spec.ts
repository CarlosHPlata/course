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

  it('should get live cell neighbors ', () => {
    const cell: Cell = [1, 2];
    const cell_neighbour: Cell = [1, 3];

    board.addCell(cell);
    board.addCell(cell_neighbour);

    const have_neighbour: boolean = board.getNeighbours(cell).has(cell_neighbour);
    expect(have_neighbour).toBeTruthy()
  });

  it('shouldnt find not neighbor cells', () => {
    const cell: Cell = [1, 2];
    const not_neighbour: Cell = [9, 9];

    board.addCell(cell);
    board.addCell(not_neighbour);

    const have_neighbour: boolean = board.getNeighbours(cell).has(not_neighbour);
    expect(have_neighbour).toBeFalsy()
  });

  it('should count only alive neighbor cells', () => {
    const cell: Cell = [1, 2];

    board.addCell(cell);
    const isDeadNeighbor = board.getNeighbours(cell).has([1, 1]);

    expect(isDeadNeighbor).toBeFalsy();
  });

  it('should not include itself as neighbor', () => {
    const cell: Cell = [1, 2];

    board.addCell(cell);
    const isSameCellIncluded = board.getNeighbours(cell).has([1, 2]);

    expect(isSameCellIncluded).toBeFalsy();
  });

  it('should go to the next iteration', () => {
    const cell: Cell = [1, 2];

    board.addCell(cell);
    let tempBoard = board.goNext();

    expect(tempBoard).toBeDefined();
  })

  it('should detect if a cell stays alive when it has 2 neighbors', () => {
    const cell: Cell = [1, 2];
    const cell2: Cell = [2, 2];
    const cell3: Cell = [1, 1];

    board.addCell(cell);
    board.addCell(cell2);
    board.addCell(cell3);
    let tempBoard = board.goNext();

    expect(tempBoard.isAlive(cell)).toBeTruthy();
  })

  it('should detect if a cell continues alive when it has 3 neighbors', () => {
    const cell: Cell = [1, 2];
    const cell2: Cell = [2, 2];
    const cell3: Cell = [1, 1];
    const cell4: Cell = [1, 3];

    board.addCell(cell);
    board.addCell(cell2);
    board.addCell(cell3);
    board.addCell(cell4);

    let tempBoard = board.goNext();

    expect(tempBoard.isAlive(cell)).toBeTruthy();
  })

  it('should detect if a dead cell become alive when it has 3 live neighbors', () => {
    const cell: Cell = [1, 2];
    const cell2: Cell = [2, 2];
    const cell3: Cell = [1, 1];
    const cell4: Cell = [1, 3];

    board.addCell(cell2);
    board.addCell(cell3);
    board.addCell(cell4);

    let tempBoard = board.goNext();

    expect(tempBoard.isAlive(cell)).toBeTruthy();
  })


});