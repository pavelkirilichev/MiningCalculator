import { currencyModule } from "../../main";

class CurrencyHelper {
  static convertToCurrentCurrency(value: number) {
    const currentCurrency = currencyModule.current

    return Number(value > 0 ? value * currentCurrency.rate : 0)
  }
  
  static convertFromCurrentCurrency(value: number) {
    const currentCurrency = currencyModule.current

    return Number(value > 0 ? value / currentCurrency.rate : 0)
  }
}

export { CurrencyHelper }