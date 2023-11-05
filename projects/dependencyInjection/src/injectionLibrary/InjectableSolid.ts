
// @InjectableSolid('hola mundo')
// export class MyClase {}

import { InjectableBox } from './InjectableBox'


export function InjectableSolid(key: string): Function {
  return function (Target: new () => object): void {
    console.log(key)
    InjectableBox.getInstance().getInjectables().set(key, new Target())
  }
}
