import { cryptoModule, gpuModule, hashrateModule, parametersModule, currencyModule } from '../../main';

class DataPort {
  static getDevices() {
    return gpuModule.selected
  }

  static getCoins() {
    return cryptoModule.list
  }

  static getCurrencyRate() {
    const currency = currencyModule.current
    if (currency && currency.key !== 'USD') return currency.rate
    
    return 1
  }

  static getCurrentCoin() {
    return cryptoModule.current
  }

  static getkwHPrice() {
    return parametersModule.getParameter("energy.kWPrice", true)
  }

  static getWorkHours() {
    return parametersModule.energy.workHours
  }

  static getGeneralCommission() {
    return parametersModule.commissions.commission
  }

  static getSummaryPowerConsumption() {
    return parametersModule.getParameter("energy.summaryPowerConsumption", true)
  }

  static getPowerConsumption() {
    return parametersModule.getParameter("energy.powerConsumption", true)
  }

  static getAlgorithm() {
    return hashrateModule.current
  }

  static getFarmCost() {
    return parametersModule.getParameter("farm.farmCost", true)
  }

  static getIsEnabledFarmCost() {
    return parametersModule.farm.isEnable
  }

  static getFarmFrameCost() {
    return parametersModule.getParameter("farm.frameCost", true)
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
    return parametersModule.getParameter("commissions.transferCommissionFix", true)
  }

  static getOsSubscription() {
    return parametersModule.getParameter("commissions.subscription", true)
  }

  static getActualCryptoPrice() {
    return parametersModule.getParameter("exchangeRate.actualPrice", true)
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
  
  static getNetworkMode() {
    return parametersModule.network.mode
  }
}

export { DataPort }