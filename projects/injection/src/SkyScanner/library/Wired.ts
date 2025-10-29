import 'reflect-metadata'
import { InstanceBox } from './InstanceBox'

// @Wired("sadfasdfasd")
export function Wired(token: string): ClassDecorator {
  return (target: Object) => {
    console.log(`registering ${token} for class ${(target as any).name}`)
    let myObject = new (target as any)()
    const box = InstanceBox.getBox()
    box.setInstance(token, myObject)
  }
}