import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators';
import store from '../main';

@Module({
  stateFactory: true,
  namespaced: true,
  name: 'Parameters'
})
class Parameters extends VuexModule {
  energy = {
    kWPrice: 0,
    workHours: 24,
    powerConsumption: 10,
  }

  commissions = {
    pullCommission: null as number | null,
    transactionCommission: 0.1,
    transferCommission: 2.5,
    subscription: 10
  }

  exchangeRate = {
    actualPrice: 1.4,
    valueGrowthPercentage: 6.5
  }

  taxes = {
    current: 4 as number | null
  }

  network = {
    difficultyLevel: null as number | null,
    growthInComplexity: 6.5,
    networkGwothTime: 1.4
  }
  
  farm = {
    farmCost: 0,
    cascadeCost: 0,
  }
  
  comission = 0

  get energySum() {
    return this.energy.kWPrice * this.energy.workHours
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