import { DataPort } from "./DataPort"

class ChangeHelper {
  static hasNetworkKeys() {
    const register = DataPort.getParametersRegister()
    return register.some(token => ["network.difficultyLevel", "network.networkGwothTimeDay", "network.networkGwothTimeWeek", "network.networkGwothTimeMonth", "network.growthInComplexity"].includes(token))
  }
  
  static hasExchangeKeys() {
    const register = DataPort.getParametersRegister()
    return register.some(token => ["exchangeRate.actualPrice", "exchangeRate.valueGrowthPercentageMonth", "exchangeRate.valueGrowthPercentageYear"].includes(token))
  }
}

export { ChangeHelper }