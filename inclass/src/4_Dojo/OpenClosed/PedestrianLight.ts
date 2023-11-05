import { Lightbulb } from "./Lightbulb"
import { Publisher } from "./Publisher"

export type LightState = 'green' | 'yellow' | 'red'

export class PedestrianLight extends Publisher {
  private state: LightState

  constructor(
    private isGreen: boolean
  ) {
    super()
    this.state = isGreen ? 'green' : 'red'
  }

  change() {
    this.setAndNotifyLightState('yellow')

    return new Promise<void>(resolve => setTimeout(() => {
      if (this.isGreen) {
        this.setAndNotifyLightState('red')
      } else {
        this.setAndNotifyLightState('green')
      }

      this.isGreen = !this.isGreen
      resolve()
    }, 1000))
  }

  setAndNotifyLightState(state: LightState) {
    this.state = state
    this.notify(state);
  }

}
