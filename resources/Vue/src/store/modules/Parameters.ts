import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators';
import { CurrencyHelper } from './helpers/CurrencyHelper';

type Nullable<T> = T | null

enum ExchangeRateModes {
  MONTH = 0,
  YEAR = 1
}

enum NetworkModes {
  DAY = 0,
  WEEK = 1,
  MONTH = 2
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
    powerConsumption: 0,
    summaryPowerConsumption: 0,
    isEnable: false,
  }

  commissions = {
    commission: 0,
    pullCommission: 1,
    transactionCommission: 0.1,
    transferCommission: 2.5,
    transferCommissionFix: 0,
    subscription: 0,
    isEnable: true,
  }

  exchangeRate = {
    actualPrice: 0,
    valueGrowthPercentageMonth: 0,
    valueGrowthPercentageYear: 0,
    mode: ExchangeRateModes.MONTH,
    isEnable: true,
  }

  taxes = {
    current: 0,
    isEnable: true
  }

  network = {
    difficultyLevel: 0,
    growthInComplexity: 1.3,
    networkGwothTimeDay: 0,
    networkGwothTimeWeek: 0,
    networkGwothTimeMonth: 0,
    mode: NetworkModes.DAY,
    isEnable: true,
  }
  
  farm = {
    farmCost: 0,
    frameCost: 0,
    farmFullCost: 0,
    isEnable: true,
  }

  get getParameter() {
    return (key: string, isRate: boolean = false) => {
      let tmp = this as any
      let answer: number = 0;
  
      const keyMap = key.split(".")
      keyMap.forEach((_key, index) => {
        if (index === keyMap.length - 1) {
          answer = isRate ? CurrencyHelper.convertToCurrentCurrency(tmp[_key]) : tmp[_key]
        }
  
        else {
          tmp = tmp[_key]
        }
      })
  
      return answer
    }
  }
  
  @Mutation
  updateParameter<T extends string = string>({ key, value, isRate = false }: { key: string, value: T, isRate?: boolean }) {
    let tmp = this as any
    const keyMap = key.split(".")
    keyMap.forEach((_key, index) => {
      if (index === keyMap.length - 1) {

        tmp[_key] = isRate ? CurrencyHelper.convertFromCurrentCurrency(Number(value)) : Number(value)
        this.register.push(key)
      }
      else {
        tmp = tmp[_key]
      }
    })
  }

  @Mutation
  updateNetworkMode(value: NetworkModes) {
    this.network.mode = value
  }

  @Mutation
  updateExchangeRateMode(mode: ExchangeRateModes) {
    this.exchangeRate.mode = mode
  }

  @Mutation
  updateIsFormCostEnabled(value: boolean) {
    this.farm.isEnable = value
  }

  @Mutation
  updateEnergyIsEnable(value: boolean) {
    this.energy.isEnable = value

    if (!value) {
      // this.energy.kWPrice = 0
      // this.energy.workHours = 24
      this.energy.powerConsumption = 0

      this.register = this.register.filter(token => token !== 'energy.powerConsumption')
    }
  }

  @Mutation
  updateExchangeRateIsEnable(value: boolean) {
    this.exchangeRate.isEnable = value

    if (!value) {
      this.exchangeRate.actualPrice = 0
      this.exchangeRate.valueGrowthPercentageMonth = 0
      this.exchangeRate.valueGrowthPercentageYear = 0

      this.register = this.register.filter(token => token !== 'exchangeRate.actualPrice')
    }
  }

  @Mutation
  updateCommissionIsEnable(value: boolean) {
    this.commissions.isEnable = value

    if (!value) {
      this.commissions.pullCommission = 0
      this.commissions.commission = 0
      this.commissions.transactionCommission = 0
      this.commissions.transferCommission = 0
      this.commissions.transferCommissionFix = 0
      this.commissions.subscription = 0
    }
  }

  @Mutation
  updateTaxIsEnable(value: boolean) {
    this.taxes.isEnable = value

    if (!value) {
      this.taxes.current = 0
    }
  }

  @Mutation
  updateNetworkIsEnable(value: boolean) {
    this.network.isEnable = value

    if (!value) {
      this.network.difficultyLevel = 0

      this.network.growthInComplexity = 0
      this.network.networkGwothTimeDay = 0
      this.network.networkGwothTimeWeek = 0
      this.network.networkGwothTimeMonth = 0

      this.register = this.register.filter(token => token !== 'network.difficultyLevel')
    }
  }
}

export { Parameters, ExchangeRateModes, NetworkModes }