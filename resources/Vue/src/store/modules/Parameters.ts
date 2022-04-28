import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators';

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
    isEnable: true,
  }

  commissions = {
    commission: 0,
    pullCommission: 0,
    transactionCommission: 0,
    transferCommission: 0,
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
    growthInComplexity: 0,
    networkGwothTimeDay: 0,
    networkGwothTimeWeek: 0,
    networkGwothTimeMonth: 0,
    mode: NetworkModes.DAY,
    isEnable: true,
  }
  
  farm = {
    farmCost: 0,
    frameCost: 0,
    isEnable: true,
  }
  
  @Mutation
  updateParameter<T = string>({ key, value }: { key: string, value: T }) {
    let tmp = this as any
    const keyMap = key.split(".")
    keyMap.forEach((_key, index) => {
      if (index === keyMap.length - 1) {
        // if(isNaN(Number(value))) return

        tmp[_key] = Number(value)
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

    if (!value) {
      this.farm.farmCost = 0
      this.farm.frameCost = 0
    }
  }

  @Mutation
  updateEnergyIsEnable(value: boolean) {
    this.energy.isEnable = value

    if (!value) {
      this.energy.kWPrice = 0
      this.energy.powerConsumption = 0
      this.energy.workHours = 24

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