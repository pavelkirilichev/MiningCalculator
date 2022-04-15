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

  static getGeneralCommission() {
    return parametersModule.comission
  }

  static getSummaryPowerConsumption() {
    return parametersModule.energy.powerConsumption
  }

  static getAlgorithm() {
    return cryptoModule.current
  }
}

export { DataPort }