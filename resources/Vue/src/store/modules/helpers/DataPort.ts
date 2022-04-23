import { cryptoModule, gpuModule, parametersModule } from '../../main';

class DataPort {
  static getDevices() {
    return gpuModule.selected
  }

  static getCoins() {
    return cryptoModule.selected
  }

  static getCurrentCoin() {
    return cryptoModule.current
  }

  static getkwHPrice() {
    return parametersModule.energy.kWPrice
  }

  static getWorkHours() {
    return parametersModule.energy.workHours
  }

  static getGeneralCommission() {
    return parametersModule.comission
  }

  static getSummaryPowerConsumption() {
    return parametersModule.energy.summaryPowerConsumption
  }

  static getPowerConsumption() {
    return parametersModule.energy.powerConsumption
  }

  static getAlgorithm() {
    return cryptoModule.current
  }

  static getFarmCost() {
    return parametersModule.farm.farmCost
  }

  static getIsEnabledFarmCost() {
    return parametersModule.farm.isEnableFarmCost
  }

  static getFarmFrameCost() {
    return parametersModule.farm.frameCost
  }

  static getPullComission() {
    return parametersModule.commissions.pullCommission
  }

  static getTransactionCommission() {
    return parametersModule.commissions.transactionCommission
  }

  static getTransferCommission() {
    return parametersModule.commissions.transferCommission
  }

  static getTransferCommissionFix() {
    return parametersModule.commissions.transferCommissionFix
  }

  static getOsSubscription() {
    return parametersModule.commissions.subscription
  }

  static getActualCryptoPrice() {
    return parametersModule.exchangeRate.actualPrice
  }

  static getValueGrowthPercentageMode() {
    return parametersModule.exchangeRate.mode
  }

  static getValueGrowthPercentageMonth() {
    return parametersModule.exchangeRate.valueGrowthPercentageMonth
  }

  static getValueGrowthPercentageYear() {
    return parametersModule.exchangeRate.valueGrowthPercentageYear
  }

  static getCurrentTax() {
    return parametersModule.taxes.current
  }

  static getParametersRegister() {
    return parametersModule.register
  }

  static getNetworkDifficultyLevel() {
    return parametersModule.network.difficultyLevel
  }

  static getNetworkGrowthInComplexity() {
    return parametersModule.network.growthInComplexity
  }

  static getNetworkGrowthTimeDay() {
    return parametersModule.network.networkGwothTimeDay
  }

  static getNetworkGrowthTimeWeek() {
    return parametersModule.network.networkGwothTimeWeek
  }

  static getNetworkGrowthTimeMonth() {
    return parametersModule.network.networkGwothTimeMonth
  }
}

export { DataPort }