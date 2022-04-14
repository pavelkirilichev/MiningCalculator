import { Module, VuexModule } from 'vuex-module-decorators';
import { Modes } from '../main';
import { IGPUItem, SelectedIGPUItem } from './GPU';

@Module({
  stateFactory: true,
  namespaced: true,
  name: 'Sum'
})
class Sum extends VuexModule {
  get gpuList(): SelectedIGPUItem[] {
    return this.context.rootState.GPU.selected
  }

  get mode(): Modes {
    return this.context.rootState.mode
  }

  get comission(): number {
    return this.context.rootState.Parameters.comission
  }

  get kWPrice(): number {
    return this.context.rootState.Parameters.energy.kWPrice
  }

  get getBaseSum() {
    const gpuCount = this.gpuList.length
    const gpuList = this.gpuList
    const comission = this.comission
    const kWPrice = this.kWPrice

    // const gpuHashSum = gpuList.map(gpu => gpu.hashrate * gpu.count).reduce((prev, curr) => prev + curr, 0)
    // const gpuConsumabilitySum = gpuList.map(gpu => gpu.consumability).reduce((prev, curr) => prev + curr, 0)

    const gpuHashSum = 0
    const gpuConsumabilitySum = 0

    const result = (gpuHashSum * (1 - comission / 100)) - (kWPrice * (gpuConsumabilitySum * gpuCount))

    return {
      day: (result).toFixed(3),
      week: (result * 7).toFixed(3),
      month: (result * 30).toFixed(3)
    }
  }
  
  get getAdvancedSum() {
    //TODO
    return this.getBaseSum
  }

  get getSum() {
    if (this.mode === Modes.BASE_MODE) return this.getBaseSum
    if (this.mode === Modes.ADVANCED_MODE) return this.getAdvancedSum
  }
}

export { Sum }