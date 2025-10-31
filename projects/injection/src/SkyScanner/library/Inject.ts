import 'reflect-metadata'
import { InstanceBox } from './InstanceBox'

export function Inject(token: string): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    const instanceBox = InstanceBox.getBox()
    const instance = instanceBox.getInstance(token)

    if (!instance) {
      throw new Error("Class not found");
    }

    console.log(`class found for token ${token}`, !!instance)
    Object.defineProperty(target, propertyKey, {
      get: () => instance,
      enumerable: true,
      configurable: true
    })
  }
}