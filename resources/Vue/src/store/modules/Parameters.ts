import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators';
import store from '../main';

enum ExchangeRateModes {
  MONTH = 0,
  YEAR = 1
}
@Module({
  stateFactory: true,
  namespaced: true,
  name: 'Parameters'
})
class Parameters extends VuexModule {
  register: string[] = []

  energy = {
    kWPrice: 0,
    workHours: 24,
    powerConsumption: 10,
    summaryPowerConsumption: 10
  }

  commissions = {
    pullCommission: 0,
    transactionCommission: 0,
    transferCommission: 0,
    transferCommissionFix: 0,
    subscription: 0
  }

  exchangeRate = {
    actualPrice: 1.4,
    valueGrowthPercentageMonth: 6.5,
    valueGrowthPercentageYear: 10.5,
    mode: ExchangeRateModes.MONTH
  }

  taxes = {
    current: 4
  }

  network = {
    difficultyLevel: 1.4,
    growthInComplexity: 6.5,
    networkGwothTimeDay: 1,
    networkGwothTimeWeek: 2,
    networkGwothTimeMonth: 8,
  }
  
  farm = {
    farmCost: 0,
    isEnableFarmCost: true,
    frameCost: 0,
  }
  
  comission = 0

  get energySum() {
    return this.energy.kWPrice * this.energy.workHours
  }


  get farmFullCost() {
    return 0
  }

  @Mutation
  updateParameter<T = string>({ key, value }: { key: string, value: T }) {
    let tmp = this as any
    const keyMap = key.split(".")
    keyMap.forEach((_key, index) => {
      if (index === keyMap.length - 1) {
        if(isNaN(Number(value))) return

        tmp[_key] = Number(value)
        this.register.push(key)
      }
      else {
        tmp = tmp[_key]
      }
    })
  }

  @Mutation
  updateExchangeRateMode(mode: ExchangeRateModes) {
    this.exchangeRate.mode = mode
  }

  @Mutation
  updateIsFormCostEnabled(value: boolean) {
    this.farm.isEnableFarmCost = value
  }
}

export { Parameters, ExchangeRateModes }