
export class InjectableBox {
  private static instace: InjectableBox | null

  private readonly injectables: Map<string, object>

  private constructor() {
    this.injectables = new Map()
  }

  public static getInstance() {
    if (this.instace == null) {
      this.instace = new InjectableBox()
    }

    return this.instace
  }

  public getInjectables() {
    return this.injectables
  }
}
