import { Lightbulb } from "./Lightbulb"

export type LightState = 'green' | 'yellow' | 'red'

export class PedestrianLight {
  private state: LightState

  constructor(
    private isGreen: boolean,
    private lightbulb: Lightbulb
  ) {
    this.state = isGreen ? 'green' : 'red'
    this.lightbulb.showLight(this.state)
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
    this.lightbulb.showLight(this.state)
  }

}
