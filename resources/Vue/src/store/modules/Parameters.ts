import { VuexModule, Module, Mutation } from 'vuex-module-decorators';

@Module({
  stateFactory: true,
  namespaced: true,
  name: 'Parameters'
})
class Parameters extends VuexModule {
  energy = {
    kWPrice: 0,
    workHours: 24,
  }
  
  comission = 0

  get energySum() {
    return this.energy.kWPrice * this.energy.workHours
  }

  farm = {
    farmCost: 0,
    cascadeCost: 0,
  }

  get farmFullCost() {
    return 0
  }

  @Mutation
  updateParameter({ key, value }: { key: string, value: string }) {
    let tmp = this as any
    const keyMap = key.split(".")
    keyMap.forEach((_key, index) => {
      if (index === keyMap.length - 1) {
        if(isNaN(Number(value))) return

        tmp[_key] = Number(value)
      }
      else {
        tmp = tmp[_key]
      }
    })
  }
}

export { Parameters }