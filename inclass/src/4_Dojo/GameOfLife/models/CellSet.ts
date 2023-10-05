import { Cell } from "./Cell"

export class CellSet implements Set<Cell> {
  private cellSet: Set<string>

  constructor(iterable?: Iterable<Cell>) {
    let cellIterable: Iterable<string> | undefined
    if (iterable) {
      cellIterable = Array.from(iterable).map<string>((i) => this.cellToString(i))
    }

    this.cellSet = new Set<string>(cellIterable)
  }

  add(cell: Cell): this {
    this.cellSet.add(this.cellToString(cell))
    return this
  }

  clear(): void {
    this.cellSet = new Set<string>()
  }

  delete(cell: Cell): boolean {
    return this.cellSet.delete(this.cellToString(cell))
  }

  has(cell: Cell): boolean {
    return this.cellSet.has(this.cellToString(cell))
  }

  get size() {
    return this.cellSet.size
  }

  entries(): IterableIterator<[Cell, Cell]> {
    const cellsArray = Array.from(this.cellSet.entries()).map<[Cell, Cell]>(
      ([key, value]) => [this.decodeCellString(key), this.decodeCellString(value)]
    )

    return cellsArray[Symbol.iterator]()
  }

  forEach(
    callbackfn: (value: Cell, value2: Cell, set: CellSet) => void,
    thisArg?: any
  ): void {
    this.cellSet.forEach(
      (key, value) =>
        callbackfn(this.decodeCellString(key), this.decodeCellString(value), this),
      thisArg
    )
  }

  keys(): IterableIterator<Cell> {
    const cellsArray = Array.from(this.cellSet.keys()).map<Cell>((key) =>
      this.decodeCellString(key)
    )

    return cellsArray[Symbol.iterator]()
  }

  values(): IterableIterator<Cell> {
    const cellsArray = Array.from(this.cellSet.values()).map<Cell>((key) =>
      this.decodeCellString(key)
    )

    return cellsArray[Symbol.iterator]()
  }

  [Symbol.iterator](): IterableIterator<Cell> {
    return this.values()
  }

  get [Symbol.toStringTag](): string {
    return 'Set'
  }

  private cellToString(cell: Cell): string {
    return JSON.stringify(cell)
  }

  private decodeCellString(cellString: string): Cell {
    return JSON.parse(cellString)
  }
}
