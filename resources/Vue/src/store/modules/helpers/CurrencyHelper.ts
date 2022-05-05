import { currencyModule } from "../../main";

class CurrencyHelper {
  static convertToCurrentCurrency(value: number) {
    const currentCurrency = currencyModule.current

    return Number(value * currentCurrency.rate)
  }
  
  static convertFromCurrentCurrency(value: number) {
    const currentCurrency = currencyModule.current

    return Number(value / currentCurrency.rate)
  }
}

export { CurrencyHelper }