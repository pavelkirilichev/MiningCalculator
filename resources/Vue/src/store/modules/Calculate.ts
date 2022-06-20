import { VuexModule, Module } from 'vuex-module-decorators';
import { ICryptoItem } from './Crypto';
import { ChangeHelper } from './helpers/ChangeHelper';

import { DataPort } from './helpers/DataPort'
import { GPUHelper } from './helpers/GPUHelper';
import { ExchangeRateModes, NetworkModes } from './Parameters';

const shaType = ['SHA-256', 'BCD']

class CalcBaseGPU {
  getDevicesHashrate(coin: ICryptoItem) {
    const devices = DataPort.getDevices()
    const filteredByCrypto = devices.filter(device => GPUHelper.findAlgorithmByCoin(coin, device))
    const deviceHashrates = filteredByCrypto.map(device => {
      return {
        count: device.count,
        algorithm: device.algorithms.find(algo => algo.key === coin.algorithm)?.speed || 0
      }
    })

    return deviceHashrates
  }

  getDevicesPower(coin: ICryptoItem) {
    const devices = DataPort.getDevices()
    const filteredByCrypto = devices.filter(device => GPUHelper.findAlgorithmByCoin(coin, device))
    const devicesPower = filteredByCrypto.map(device => {
      return {
        count: device.count,
        power: device.algorithms.find(algo => algo.key === coin.algorithm)?.power || 0
      }
    })

    return devicesPower
  }

  getHashrate(devices: { count: number, algorithm: number }[]) {
    return devices.map(device => device.algorithm * device.count).reduce((curr, prev) => curr + prev, 0)
  }

  getPowerConsumption(devices: { count: number, power: number }[]) {
    return devices.map(device => device.power * device.count).reduce((curr, prev) => curr + prev, 0)
  }

  gain24h(coin: ICryptoItem) {
    const hashrate_c011 = this.getHashrate(this.getDevicesHashrate(coin))
    // const hashrate_c011 = 97878000
    const difficulty_c012 = coin.difficulty
    
    const findBlocksCount_c013 = (hashrate_c011 * 86400) / difficulty_c012
    
    const coinsCount_c014 = findBlocksCount_c013 * coin.reward_block

    const c11 = coinsCount_c014

    return c11
  }

  gain24hFiat(coin: ICryptoItem) {
    const coinsCount = this.gain24h(coin)

    const c12 = coinsCount * (coin.price * DataPort.getCurrencyRate())

    return c12
  }

  getDayGain(coin: ICryptoItem) {
    const _24hFiat_c12 = this.gain24hFiat(coin)
    const commission_u14 = DataPort.getGeneralCommission()
    const powerConsumption_c015 = this.getPowerConsumption(this.getDevicesPower(coin)) / 1000
    const kwHPrice_u13 = DataPort.getkwHPrice()

    const c13 = (_24hFiat_c12 * ((100 - commission_u14) * 0.01)) - (powerConsumption_c015 * kwHPrice_u13 * 24)

    return c13
  }

  getWeekGain(coin: ICryptoItem) {
    const c14 = this.getDayGain(coin) * 7

    return c14
  }

  getMonthGain(coin: ICryptoItem) {
    const c15 = this.getDayGain(coin) * 30

    return c15
  }
}

class CalcBaseHashrate {
  getHashrate(coin: ICryptoItem) {
    const algrorithm = DataPort.getAlgorithm()

    const hashrate_c021 = algrorithm ? algrorithm.mhS * 1000000 : 0

    return hashrate_c021
  }

  gain24h(coin: ICryptoItem) {
    const hashrate_c021 = this.getHashrate(coin)
    const diffculty_c022 = coin.difficulty
    const findBlocksCount_c023 = (hashrate_c021 * 86400) / diffculty_c022
    const coinsCount_c024 = findBlocksCount_c023 * coin.reward_block
    
    const c21 = coinsCount_c024

    return c21
  }

  gain24hFiat(coin: ICryptoItem) {
    const c21 = this.gain24h(coin)    
    const c22 = c21 * (coin.price * DataPort.getCurrencyRate())
    
    return c22
  }
  
  getDayGain(coin: ICryptoItem) {
    const summaryPowerConsumption_c025 = DataPort.getSummaryPowerConsumption()
    const generalCommission_u25 = DataPort.getGeneralCommission()
    const kwHPrice_u23 = DataPort.getkwHPrice()
    
    const c22 = this.gain24hFiat(coin)
    
    const c23 = (c22 * ((100 - generalCommission_u25) * 0.01)) - (summaryPowerConsumption_c025 * kwHPrice_u23 * 24)

    return c23
  }

  getWeekGain(coin: ICryptoItem) {
    const c23 = this.getDayGain(coin)

    const c24 = c23 * 7
    
    return c24
  }

  getMonthGain(coin: ICryptoItem) {
    const c23 = this.getDayGain(coin)

    const c25 = c23 * 30

    return c25
  }
}

class CalcAdvancedGPU {
  baseCalc: CalcBaseGPU

  constructor() {
    this.baseCalc = new CalcBaseGPU()
  }

  getHashrate(coin: ICryptoItem) {
    const hashrate_c031 = this.baseCalc.getHashrate(this.baseCalc.getDevicesHashrate(coin))

    return hashrate_c031
  }
  
  getPowerConsumption(coin: ICryptoItem) {
    const power = this.baseCalc.getPowerConsumption(this.baseCalc.getDevicesPower(coin))

    // console.log('power', power)
    return power
  }

  getSummaryPowerConsumption(coin: ICryptoItem) {
    const isUserInput = DataPort.getParametersRegister().some(token => token === "energy.gpuPowerConsumption") && DataPort.getPowerConsumption()

    const summaryPowerConsumption_c312 = isUserInput ? DataPort.getPowerConsumption() : (this.getPowerConsumption(coin))

    // console.log('summary power', summaryPowerConsumption_c312)

    return summaryPowerConsumption_c312
  }
  
  getNetworkDifficulty(coin: ICryptoItem) {
    const isSHa = shaType.map(s => s.toLowerCase()).includes(coin.algorithm.toLowerCase())
    const isUserInput = ChangeHelper.hasNetworkKeys()
    const baseValue_u318 = isUserInput ? (DataPort.getNetworkDifficultyLevel() || isSHa ? coin.difficulty * 2**32 : coin.difficulty) : (isSHa ? coin.difficulty * 2**32 : coin.difficulty)
    const networkGrowthInComplexity_u319 = DataPort.getNetworkGrowthInComplexity()
    const networkGrowthTime_u320_1 = DataPort.getNetworkGrowthTimeDay()
    const networkGrowthTime_u320_2 = Math.floor(DataPort.getNetworkGrowthTimeWeek() * 7)
    const networkGrowthTime_u320_3 = Math.floor(DataPort.getNetworkGrowthTimeMonth() * 30)

    const netwrokGrowthTime_u320: {[K in NetworkModes]: number } = {
      [NetworkModes.DAY]: networkGrowthTime_u320_1,
      [NetworkModes.WEEK]: networkGrowthTime_u320_2,
      [NetworkModes.MONTH]: networkGrowthTime_u320_3
    }

    const networkDifficulty_c032 = [baseValue_u318]

    // console.log(netwrokGrowthTime_u320[DataPort.getNetworkMode()])

    for (let i = 1; i < 2049; i++) {
      if (i <= netwrokGrowthTime_u320[DataPort.getNetworkMode()]) {
        networkDifficulty_c032[i] = networkDifficulty_c032[i - 1] * (1 + (networkGrowthInComplexity_u319 / 100))
      }
      else {
        networkDifficulty_c032[i] = networkDifficulty_c032[i - 1]
      }
    }

    // console.log("сложность", networkDifficulty_c032)
    return networkDifficulty_c032
  }

  getFindBlocksCount(coin: ICryptoItem) {
    const networkMode = DataPort.getNetworkMode()
    const networkDifficulty_c032 = this.getNetworkDifficulty(coin)
    const hashrate_c031 = this.getHashrate(coin)

    let key: 'day' | 'week' | 'month' = 'day'

    if(networkMode === NetworkModes.WEEK) key = 'week'
    if(networkMode === NetworkModes.MONTH) key = 'month'

    const findBlocksCount_c033 = networkDifficulty_c032.map(value => (hashrate_c031 * 86400) / value)

    // console.log("найдено блоков", findBlocksCount_c033)
    return findBlocksCount_c033
  }

  getCoinsCount(coin: ICryptoItem) {
    const findBlocksCount_c033 = this.getFindBlocksCount(coin)
    const coinsCount_c034 = findBlocksCount_c033.map(value => value * coin.reward_block)

    // console.log("получено монет", coinsCount_c034)
    return coinsCount_c034
  }

  getKWConsumption(coin: ICryptoItem) {
    const summaryPowerConsumption_c312 = this.getSummaryPowerConsumption(coin)
    const kWConsumption_c035 = summaryPowerConsumption_c312 / 1000

    // console.log("потребление энергии", kWConsumption_c035)
    return kWConsumption_c035
  }

  getCoinPrice(coin: ICryptoItem) {
    const isUserInput = ChangeHelper.hasExchangeKeys()

    const baseValue = isUserInput ? ((DataPort.getActualCryptoPrice() || coin.price) * DataPort.getCurrencyRate()) : (coin.price * DataPort.getCurrencyRate())

    const valueGrowthPercentageMonth_u315 = DataPort.getValueGrowthPercentageMonth()
    const valueGrowthPercentageYear_u316 = DataPort.getValueGrowthPercentageYear()
    
    const coinPrice_c037: { base: number[], month: number[], year: number[] } = {
      base: [baseValue],
      month: [baseValue],
      year: [baseValue]
    }

    for (let i = 1; i < 2048; i++) {
      coinPrice_c037.base[i] = baseValue
      coinPrice_c037.month[i] = (Math.abs(100 + (valueGrowthPercentageMonth_u315 / 30)) * 0.01) * coinPrice_c037.month[i - 1]
      coinPrice_c037.year[i] = (Math.abs(100 + (valueGrowthPercentageYear_u316 / 365)) * 0.01) * coinPrice_c037.year[i - 1]
    }

    // console.log("цена монеты", coinPrice_c037)
    return coinPrice_c037
  }

  getPowerConsumptionSum(coin?: ICryptoItem) {
    const isUserInput = DataPort.getParametersRegister().some(token => token === "energy.gpuPowerConsumption") && DataPort.getGpuPowerConsumption()

    const kWhPrice_u33 = DataPort.getkwHPrice()
    const kWhHours_u34 = DataPort.getWorkHours()
    const kWConsumption_c035 = isUserInput ? DataPort.getGpuPowerConsumption() : coin ? this.getKWConsumption(coin!) : 0

    const powerConsumptionSum_c31 = kWConsumption_c035 * kWhPrice_u33 * kWhHours_u34

    // console.log("сумма", powerConsumptionSum_c31)
    return powerConsumptionSum_c31
  }

  getFullFarmCost() {
    const isInput = !DataPort.getIsEnabledFarmCost()
    const farmCost_u36 = DataPort.getFarmCost()
    const farmFrameCost_u37 = DataPort.getFarmFrameCost()

    const fullFarmCost_c32 = isInput ? DataPort.getFarmFullCost() : farmCost_u36 + farmFrameCost_u37

    // console.log("полная стоимость фермы", fullFarmCost_c32)
    return fullFarmCost_c32
  }

  gain24h(coin: ICryptoItem) {
    const coinsCount_c034 = this.getCoinsCount(coin)
    const workHours_u34 = DataPort.getWorkHours()

    const gain24h_c33 = (coinsCount_c034[0] / 24) * workHours_u34

    // console.log("24 часа", gain24h_c33)
    return gain24h_c33
  }

  gain24hFiat(coin: ICryptoItem) {
    const isUserInput = ChangeHelper.hasExchangeKeys()
    const gain24h_c33 = this.gain24h(coin)

    const coinPrice = isUserInput ? ((DataPort.getActualCryptoPrice() || coin.price) * DataPort.getCurrencyRate()) : (coin.price * DataPort.getCurrencyRate())
    
    const gain24hFiat_c34 = gain24h_c33 * coinPrice

    // console.log("24 часа фиат", gain24hFiat_c34)
    return gain24hFiat_c34
  }

  gainMonth(coin: ICryptoItem) {
    const coinsCount_c034 = this.getCoinsCount(coin).filter((_, i) => i < 30)
    const workHours_u34 = DataPort.getWorkHours()

    const gainMonth_c35 = coinsCount_c034.map(c034 => (c034 / 24) * workHours_u34).reduce((prev, curr) => prev + curr, 0)

    return gainMonth_c35
  }

  gainMonthFiat(coin: ICryptoItem) {
    const coinsCount_c034 = this.getCoinsCount(coin).filter((_, i) => i < 30)
    const coinPrice_c037 = this.getCoinPrice(coin)
    const workHours_u34 = DataPort.getWorkHours()

    const gainMonthFiat_c36 = coinsCount_c034.map((c034, index) => ((c034 / 24) * workHours_u34) * coinPrice_c037.month[index]).reduce((prev, curr) => prev + curr, 0)

    return gainMonthFiat_c36
  }

  getEarnings(coin: ICryptoItem) {
    const coinsCount_c034 = this.getCoinsCount(coin)
    const coinPrice_c037 = this.getCoinPrice(coin)
    const workHours_u34 = DataPort.getWorkHours()
    const pullCommission_u39 = DataPort.getPullComission()
    const transactionCommission_u310 = DataPort.getTransactionCommission()
    const transferCommission_u311 = DataPort.getTransferCommission()
    const currentTax_u317 = DataPort.getCurrentTax()
    const transferCommissionFix_u312 = DataPort.getTransferCommissionFix()
    const osSubsctiption_u313 = DataPort.getOsSubscription()
    const powerConsumptionSum_c31 = this.getPowerConsumptionSum(coin)

    const isUserInput = ChangeHelper.hasExchangeKeys()
    const exchangeRateMode = DataPort.getValueGrowthPercentageMode()
    
    let key: 'base' | 'month' | 'year' = 'base'

    if (isUserInput) {
      if (exchangeRateMode === ExchangeRateModes.MONTH) key = 'month'
      if (exchangeRateMode === ExchangeRateModes.YEAR) key = 'year'
    }

    const earnings_c038 = coinsCount_c034.map((c034, index) => (c034 / 24) * workHours_u34 * coinPrice_c037[key][index] * (Math.abs(100 - pullCommission_u39) * 0.01) * (Math.abs(100 - transactionCommission_u310) * 0.01) * (Math.abs(100 - transferCommission_u311) * 0.01) * (Math.abs(100 - currentTax_u317) * 0.01) - transferCommissionFix_u312 - powerConsumptionSum_c31 - (osSubsctiption_u313 / 30))

    return earnings_c038
  }

  getEarningDay(coin: ICryptoItem) {
    const earnings_c038 = this.getEarnings(coin)

    const earningDay_c37 = earnings_c038[0]

    // console.log("прибыль день", earningDay_c37)
    return earningDay_c37
  }

  getEarningWeek(coin: ICryptoItem) {
    const earnings_c038 = this.getEarnings(coin)

    const earningWeek_c38 = earnings_c038.filter((_, i) => i < 7).reduce((prev, curr) => prev + curr, 0)

    return earningWeek_c38
  }

  getEarningMonth(coin: ICryptoItem) {
    const earnings_c038 = this.getEarnings(coin)

    const earningMonth_c39 = earnings_c038.filter((_, i) => i < 30).reduce((prev, curr) => prev + curr, 0)

    return earningMonth_c39
  }

  getFarmPaybackPeriod(coin: ICryptoItem) {
    const earnings_c038 = [...this.getEarnings(coin), 0]
    const fullFarmCost_c032 = this.getFullFarmCost() * DataPort.getCurrencyRate()

    let day = 2049;
    let paybackMonth_c310 = 2049
    let paybackDay_c311 = 2049

    for (let i = 0; i < earnings_c038.length; i++) {
      const sum = earnings_c038.filter((_, j) => j <= i).reduce((prev, curr) => prev + curr, 0)
      if (sum >= fullFarmCost_c032) {
        day = i + 1
        
        paybackMonth_c310 = Math.floor(day / 30)
        paybackDay_c311 = day % 30
        
        // console.log(day, sum, fullFarmCost_c032)

        break
      }
      
    }
    
    // console.log("срок окупаемости", { month: paybackMonth_c310, day: paybackDay_c311 })

    return {
      month: day < 2049 ? String(paybackMonth_c310) : "∞",
      day: day < 2049 ? String(paybackDay_c311): "∞"
    }
  }
}

class CalcAdvancedHashrate {
  baseCalc: CalcBaseHashrate

  constructor() {
    this.baseCalc = new CalcBaseHashrate()
  }

  getHashrate(coin: ICryptoItem) {
    const algorithm = DataPort.getAlgorithm()
    const hashrate_c041 = algorithm ? algorithm.mhS * 1000000 : 0

    return hashrate_c041
  }

  getSummaryPowerConsumption(coin?: ICryptoItem) {
    const summaryPowerConsumption_c412 = DataPort.getPowerConsumption()

    return summaryPowerConsumption_c412
  }
  
  getNetworkDifficulty(coin: ICryptoItem) {
    const isSHa = shaType.map(s => s.toLowerCase()).includes(coin.algorithm.toLowerCase())
    const isUserInput = ChangeHelper.hasNetworkKeys()
    const baseValue_u418 = isUserInput ? (DataPort.getNetworkDifficultyLevel() || (isSHa ? coin.difficulty * 2**32 : coin.difficulty)) : (isSHa ? coin.difficulty * 2**32 : coin.difficulty)
    const networkGrowthInComplexity_u419 = DataPort.getNetworkGrowthInComplexity()
    const networkGrowthTime_u420_1 = DataPort.getNetworkGrowthTimeDay()
    const networkGrowthTime_u420_2 = Math.floor(DataPort.getNetworkGrowthTimeWeek() * 7)
    const networkGrowthTime_u420_3 = Math.floor(DataPort.getNetworkGrowthTimeMonth() * 30)

    const netwrokGrowthTime_u420: {[K in NetworkModes]: number } = {
      [NetworkModes.DAY]: networkGrowthTime_u420_1,
      [NetworkModes.WEEK]: networkGrowthTime_u420_2,
      [NetworkModes.MONTH]: networkGrowthTime_u420_3
    }

    const networkDifficulty_c042 = [baseValue_u418]

    for (let i = 1; i < 2049; i++) {
      if (i <= netwrokGrowthTime_u420[DataPort.getNetworkMode()]) {
        networkDifficulty_c042[i] = networkDifficulty_c042[i - 1] * (1 + (networkGrowthInComplexity_u419 / 100))
      }
      else networkDifficulty_c042[i] = networkDifficulty_c042[i - 1]
    }

    // console.log("сложность", networkDifficulty_c032)
    return networkDifficulty_c042
  }

  getFindBlocksCount(coin: ICryptoItem) {
    const networkMode = DataPort.getNetworkMode()
    const networkDifficulty_c042 = this.getNetworkDifficulty(coin)
    const hashrate_c041 = this.getHashrate(coin)

    let key: 'day' | 'week' | 'month' = 'day'

    if(networkMode === NetworkModes.WEEK) key = 'week'
    if(networkMode === NetworkModes.MONTH) key = 'month'

    const findBlocksCount_c043 = networkDifficulty_c042.map(value => (hashrate_c041 * 86400) / value)

    // console.log("найдено блоков", findBlocksCount_c033)
    return findBlocksCount_c043
  }

  getCoinsCount(coin: ICryptoItem) {
    const findBlocksCount_c043 = this.getFindBlocksCount(coin)
    const coinsCount_c044 = findBlocksCount_c043.map(value => value * coin.reward_block)

    return coinsCount_c044
  }

  getKWConsumption(coin?: ICryptoItem) {
    const kWConsumption_c045 = DataPort.getPowerConsumption()

    return kWConsumption_c045
  }

  getCoinPrice(coin: ICryptoItem) {
    const isUserInput = ChangeHelper.hasExchangeKeys()

    const baseValue = isUserInput ? ((DataPort.getActualCryptoPrice() || coin.price) * DataPort.getCurrencyRate()) : (coin.price * DataPort.getCurrencyRate())

    const valueGrowthPercentageMonth_u415 = DataPort.getValueGrowthPercentageMonth()
    const valueGrowthPercentageMonth_u416 = DataPort.getValueGrowthPercentageYear()
    const coinPrice_c047: { base: number[], month: number[], year: number[] } = {
      base: [baseValue],
      month: [baseValue],
      year: [baseValue]
    }

    for (let i = 1; i < 2048; i++) {
      coinPrice_c047.base[i] = baseValue
      coinPrice_c047.month[i] = (Math.abs(100 + (valueGrowthPercentageMonth_u415 / 30)) * 0.01) * coinPrice_c047.month[i - 1]
      coinPrice_c047.year[i] = (Math.abs(100 + (valueGrowthPercentageMonth_u416 / 365)) * 0.01) * coinPrice_c047.year[i - 1]
    }

    return coinPrice_c047
  }

  getSum(coin?: ICryptoItem) {
    const kWHours_u44 = DataPort.getWorkHours()
    const kWhPrice_u43 = DataPort.getkwHPrice()
    const kWConsumption_c045 = this.getKWConsumption()

    const sum_c41 = kWConsumption_c045 * kWhPrice_u43  * kWHours_u44

    return sum_c41
  }

  getFullFarmCost(coin?: ICryptoItem) {
    const isInput = !DataPort.getIsEnabledFarmCost()
    const farmCost_u46 = DataPort.getFarmCost()
    const farmFrameCost_u47 = DataPort.getFarmFrameCost()

    const fullFarmCost_c42 = isInput ? DataPort.getFarmFullCost() : farmCost_u46 + farmFrameCost_u47

    return fullFarmCost_c42
  }

  gain24h(coin: ICryptoItem) {
    const coinsCount_c044 = this.getCoinsCount(coin)
    const workHours_u44 = DataPort.getWorkHours()

    const gain24h_c43 = (coinsCount_c044[0] / 24) * workHours_u44

    return gain24h_c43
  }

  gain24hFiat(coin: ICryptoItem) {
    const isUserInput = ChangeHelper.hasExchangeKeys()
    const gain24h_c43 = this.gain24h(coin)

    const coinPrice = isUserInput ? ((DataPort.getActualCryptoPrice() || coin.price) * DataPort.getCurrencyRate()) : (coin.price * DataPort.getCurrencyRate())
    
    const gain24hFiat_c44 = gain24h_c43 * coinPrice

    return gain24hFiat_c44
  }

  gainMonth(coin: ICryptoItem) {
    const coinsCount_c044 = this.getCoinsCount(coin).filter((_, i) => i < 30)
    const workHours_u44 = DataPort.getWorkHours()

    const gainMonth_c45 = coinsCount_c044.map(c044 => (c044 / 24) * workHours_u44).reduce((prev, curr) => prev + curr, 0)

    return gainMonth_c45
  }

  gainMonthFiat(coin: ICryptoItem) {
    const coinsCount_c044 = this.getCoinsCount(coin).filter((_, i) => i < 30)
    const coinPrice_c047 = this.getCoinPrice(coin)
    const workHours_u44 = DataPort.getWorkHours()

    const gainMonthFiat_c46 = coinsCount_c044.map((c044, index) => ((c044 / 24) * workHours_u44) * coinPrice_c047.month[index]).reduce((prev, curr) => prev + curr, 0)

    return gainMonthFiat_c46
  }

  getEarnings(coin: ICryptoItem) {
    const coinsCount_c044 = this.getCoinsCount(coin)
    const coinPrice_c047 = this.getCoinPrice(coin)
    const workHours_u44 = DataPort.getWorkHours()
    const pullCommission_u49 = DataPort.getPullComission()
    const transactionCommission_u410 = DataPort.getTransactionCommission()
    const transferCommission_u411 = DataPort.getTransferCommission()
    const currentTax_u417 = DataPort.getCurrentTax()
    const transferCommissionFix_u412 = DataPort.getTransferCommissionFix()
    const osSubsctiption_u413 = DataPort.getOsSubscription()
    const powerConsumptionSum_c41 = this.getSum(coin)

    const isUserInput = ChangeHelper.hasExchangeKeys()
    const exchangeRateMode = DataPort.getValueGrowthPercentageMode()
    
    let key: 'base' | 'month' | 'year' = 'base'

    if (isUserInput) {
      if (exchangeRateMode === ExchangeRateModes.MONTH) key = 'month'
      if (exchangeRateMode === ExchangeRateModes.YEAR) key = 'year'
    }

    const earnings_c048 = coinsCount_c044.map((c044, index) => (c044 / 24) * workHours_u44 * coinPrice_c047[key][index] * (Math.abs(100 - pullCommission_u49) * 0.01) * (Math.abs(100 - transactionCommission_u410) * 0.01) * (Math.abs(100 - transferCommission_u411) * 0.01) * (Math.abs(100 - currentTax_u417) * 0.01) - transferCommissionFix_u412 - powerConsumptionSum_c41 - (osSubsctiption_u413 / 30))

    return earnings_c048
  }

  getEarningDay(coin: ICryptoItem) {
    const earnings_c048 = this.getEarnings(coin)

    const earningDay_c47 = earnings_c048[0]

    return earningDay_c47
  }

  getEarningWeek(coin: ICryptoItem) {
    const earnings_c048 = this.getEarnings(coin)

    const earningWeek_c48 = earnings_c048.filter((_, i) => i < 7).reduce((prev, curr) => prev + curr, 0)

    return earningWeek_c48
  }

  getEarningMonth(coin: ICryptoItem) {
    const earnings_c048 = this.getEarnings(coin)

    const earningMonth_c49 = earnings_c048.filter((_, i) => i < 30).reduce((prev, curr) => prev + curr, 0)

    return earningMonth_c49
  }

  getFarmPaybackPeriod(coin: ICryptoItem) {
    const earnings_c048 = this.getEarnings(coin)
    const fullFarmCost_c042 = this.getFullFarmCost(coin) * DataPort.getCurrencyRate()

    let day = 2049;
    let paybackMonth_c410 = 2049
    let paybackDay_c411 = 2049

    for (let i = 0; i < earnings_c048.length; i++) {
      const sum = earnings_c048.filter((_, j) => j <= i).reduce((prev, curr) => prev + curr, 0)
      if (sum >= fullFarmCost_c042) {
        day = i + 1
        
        paybackMonth_c410 = Math.floor(day / 30)
        paybackDay_c411 = day % 30
        
        // console.log(day, sum, fullFarmCost_c042)

        break
      }
      
    }
    
    // console.log("срок окупаемости", { month: paybackMonth_c410, day: paybackDay_c411 })

    return {
      month: day < 2049 ? String(paybackMonth_c410) : "∞",
      day: day < 2049 ? String(paybackDay_c411): "∞"
    }
  }
}

@Module({
  namespaced: true,
  stateFactory: true,
  name: 'Calculate'
})
class Calculate extends VuexModule {
  get gain24hGPU() {
    return (coin: ICryptoItem) => {
      const calcBaseGpu = new CalcBaseGPU()
  
      return calcBaseGpu.gain24h(coin)
    }
  }

  get gain24hFiatGPU() {
    return (coin: ICryptoItem) => {
      const calcBaseGpu = new CalcBaseGPU()
  
      return calcBaseGpu.gain24hFiat(coin)
    }
  }

  get gainDayGPU() {
    return (coin: ICryptoItem) => {
      const calcBaseGPU = new CalcBaseGPU()

      return calcBaseGPU.getDayGain(coin)
    }
  }

  get gainWeekGPU() {
    return (coin: ICryptoItem) => {
      const calcBaseGPU = new CalcBaseGPU()

      return calcBaseGPU.getWeekGain(coin)
    }
  }

  get gainMonthGPU() {
    return (coin: ICryptoItem) => {
      const calcBaseGPU = new CalcBaseGPU()

      return calcBaseGPU.getMonthGain(coin)
    }
  }

  get gain24hHashrate() {
    return (coin: ICryptoItem) => {
      const calcBaseHashrate = new CalcBaseHashrate()
  
      return calcBaseHashrate.gain24h(coin)
    }
  }

  get gain24hFiatHashrate() {
    return (coin: ICryptoItem) => {
      const calcBaseHashrate = new CalcBaseHashrate()
  
      return calcBaseHashrate.gain24hFiat(coin)
    }
  }

  get gainDayHashrate() {
    return (coin: ICryptoItem) => {
      const calcBaseHashrate = new CalcBaseHashrate()

      return calcBaseHashrate.getDayGain(coin)
    }
  }

  get gainWeekHashrate() {
    return (coin: ICryptoItem) => {
      const calcBaseHashrate = new CalcBaseHashrate()

      return calcBaseHashrate.getWeekGain(coin)
    }
  }

  get gainMonthHashrate() {
    return (coin: ICryptoItem) => {
      const calcBaseHashrate = new CalcBaseHashrate()

      return calcBaseHashrate.getMonthGain(coin)
    }
  }

  get devicesPowerConsumptionAdvancedGPU() {
    return (coin: ICryptoItem) => {
      const calcAdvancedGPU = new CalcAdvancedGPU()

      return calcAdvancedGPU.getPowerConsumption(coin)
    }
  }

  get gain24hAdvancedGPU() {
    return (coin: ICryptoItem) => {
      const calcAdvancedGPU = new CalcAdvancedGPU()
      
      return calcAdvancedGPU.gain24h(coin)
    }
  }

  get gain24hFiatAdvancedGPU() {
    return (coin: ICryptoItem) => {
      const calcAdvancedGPU = new CalcAdvancedGPU()
      
      return calcAdvancedGPU.gain24hFiat(coin)
    }
  }

  get gainMonthAdvancedGPU() {
    return (coin: ICryptoItem) => {
      const calcAdvancedGPU = new CalcAdvancedGPU()
      
      return calcAdvancedGPU.gainMonth(coin)
    }
  }

  get gainMonthFiatAdvancedGPU() {
    return (coin: ICryptoItem) => {
      const calcAdvancedGPU = new CalcAdvancedGPU()
      
      return calcAdvancedGPU.gainMonthFiat(coin)
    }
  }

  get earningDayAdvancedGPU() {
    return (coin: ICryptoItem) => {
      const calcAdvancedGPU = new CalcAdvancedGPU()

      return calcAdvancedGPU.getEarningDay(coin)
    }
  }

  get earningWeekAdvancedGPU() {
    return (coin: ICryptoItem) => {
      const calcAdvancedGPU = new CalcAdvancedGPU()

      return calcAdvancedGPU.getEarningWeek(coin)
    }
  }

  get earningMonthAdvancedGPU() {
    return (coin: ICryptoItem) => {
      const calcAdvancedGPU = new CalcAdvancedGPU()

      return calcAdvancedGPU.getEarningMonth(coin)
    }
  }

  get farmFullCostAdvancedGPU() {
    return () => {
      const calcAdvancedGPU = new CalcAdvancedGPU()

      return calcAdvancedGPU.getFullFarmCost()
    } 
  }

  get energyConsumptionSumAdvancedGPU() {
    return (coin?: ICryptoItem) => {
      const calcAdvancedGPU = new CalcAdvancedGPU()

      return calcAdvancedGPU.getPowerConsumptionSum(coin)
    } 
  }

  get farmPaybackPeriodAdvancedGPU() {
    return (coin: ICryptoItem) => {
      const calcAdvancedGPU = new CalcAdvancedGPU()
  
      return calcAdvancedGPU.getFarmPaybackPeriod(coin)
    }
  }

  get gain24hAdvancedHashrate() {
    return (coin: ICryptoItem) => {
      const calcAdvancedHashrate = new CalcAdvancedHashrate()
      
      return calcAdvancedHashrate.gain24h(coin)
    }
  }

  get energyConsumptionAdvancedHashrate() {
    return () => {
      const calcAdvancedHashrate = new CalcAdvancedHashrate()
      return calcAdvancedHashrate.getSum()
    }
  }

  get gain24hFiatAdvancedHashrate() {
    return (coin: ICryptoItem) => {
      const calcAdvancedHashrate = new CalcAdvancedHashrate()
      
      return calcAdvancedHashrate.gain24hFiat(coin)
    }
  }

  get gainMonthAdvancedHashrate() {
    return (coin: ICryptoItem) => {
      const calcAdvancedHashrate = new CalcAdvancedHashrate()
      
      return calcAdvancedHashrate.gainMonth(coin)
    }
  }

  get gainMonthFiatAdvancedHashrate() {
    return (coin: ICryptoItem) => {
      const calcAdvancedHashrate = new CalcAdvancedHashrate()
      
      return calcAdvancedHashrate.gainMonthFiat(coin)
    }
  }

  get earningDayAdvancedHashrate() {
    return (coin: ICryptoItem) => {
      const calcAdvancedHashrate = new CalcAdvancedHashrate()

      return calcAdvancedHashrate.getEarningDay(coin)
    }
  }

  get earningWeekAdvancedHashrate() {
    return (coin: ICryptoItem) => {
      const calcAdvancedHashrate = new CalcAdvancedHashrate()

      return calcAdvancedHashrate.getEarningWeek(coin)
    }
  }

  get earningMonthAdvancedHashrate() {
    return (coin: ICryptoItem) => {
      const calcAdvancedHashrate = new CalcAdvancedHashrate()

      return calcAdvancedHashrate.getEarningMonth(coin)
    }
  }

  get farmPaybackPeriodHashrate() {
    return (coin: ICryptoItem) => {
      const calcAdvancedHashrate = new CalcAdvancedHashrate()
  
      return calcAdvancedHashrate.getFarmPaybackPeriod(coin)
    }
  }
}

export { Calculate }