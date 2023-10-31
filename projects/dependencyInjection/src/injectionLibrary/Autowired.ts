import { InjectableBox } from './InjectableBox'

export function Autowired(token: string) {
  return function (target: any, key: string) {
    console.log(token, InjectableBox.getInstance().getInjectables().has(token))
    if (InjectableBox.getInstance().getInjectables().has(token)) {
      const instance = InjectableBox.getInstance().getInjectables().get(token)

      Object.defineProperty(target, key, {
        get: () => instance,
        enumerable: true,
        configurable: true
      })
    }
  }
}
