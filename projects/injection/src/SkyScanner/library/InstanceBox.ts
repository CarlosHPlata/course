export class InstanceBox {
  private instanceMap: Map<string, Object> = new Map()
  private static instance: InstanceBox

  private constructor() { }

  public static getBox() {
    if (!this.instance) this.instance = new InstanceBox()

    return this.instance
  }

  getInstance(token: string) {
    return this.instanceMap.get(token)
  }

  setInstance(token: string, instance: Object) {
    return this.instanceMap.set(token, instance)
  }
}