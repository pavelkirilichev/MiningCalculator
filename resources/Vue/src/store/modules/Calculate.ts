import { VuexModule, Module } from 'vuex-module-decorators';
import { ICryptoItem, ISelectedCryptoItem } from './Crypto';

import { DataPort } from './helpers/DataPort'
import { GPUHelper } from './helpers/GPUHelper';

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

    const c12 = coinsCount * coin.price

    return c12
  }

  getDayGain(coin: ICryptoItem) {
    const _24hFiat_c12 = this.gain24hFiat(coin)
    const commission_u14 = DataPort.getGeneralCommission() / 100
    const powerConsumption_c015 = this.getPowerConsumption(this.getDevicesPower(coin)) / 1000
    const kwHPrice_u13 = DataPort.getkwHPrice()

    const c13 = (_24hFiat_c12 * ((1 - commission_u14) * 0.01)) - (powerConsumption_c015 * kwHPrice_u13 * 24)

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
  getHashrate(coin: ISelectedCryptoItem) {
    const hashrate_c021 = coin.mhS

    return hashrate_c021
  }

  gain24h(coin: ISelectedCryptoItem) {
    const hashrate_c021 = this.getHashrate(coin)
    const diffculty_c022 = coin.difficulty
    const findBlocksCount_c023 = (hashrate_c021 * 86400) / diffculty_c022
    const coinsCount_c024 = findBlocksCount_c023 * coin.reward_block
    
    const c21 = coinsCount_c024

    return c21
  }

  gain24hFiat(coin: ISelectedCryptoItem) {
    const c21 = this.gain24h(coin)    
    const c22 = c21 * coin.price
    
    return c22
  }
  
  getDayGain(coin: ISelectedCryptoItem) {
    const summaryPowerConsumption_c025 = DataPort.getSummaryPowerConsumption()
    const generalCommission_u25 = DataPort.getGeneralCommission()
    const kwHPrice_u23 = DataPort.getkwHPrice()
    
    const c22 = this.gain24hFiat(coin)
    
    const c23 = (c22 * ((1 - generalCommission_u25) * 0.01)) - (summaryPowerConsumption_c025 * kwHPrice_u23 * 24)

    return c23
  }

  getWeekGain(coin: ISelectedCryptoItem) {
    const c23 = this.getDayGain(coin)

    const c24 = c23 * 7
    
    return c24
  }

  getMonthGain(coin: ISelectedCryptoItem) {
    const c23 = this.getDayGain(coin)

    const c25 = c23 * 30

    return c25
  }
}

@Module({
  namespaced: true,
  stateFactory: true,
  name: 'Calculate'
})
class Calculate extends VuexModule {
  get gainBaseGPU24h() {
    return (coin: ICryptoItem) => {
      const calcBaseGpu = new CalcBaseGPU()
  
      return calcBaseGpu.gain24h(coin)
    }
  }

  get gainBaseGPU24hFiat() {
    return (coin: ICryptoItem) => {
      const calcBaseGpu = new CalcBaseGPU()
  
      return calcBaseGpu.gain24hFiat(coin)
    }
  }

  get gainBaseGPUDay() {
    return (coin: ICryptoItem) => {
      const calcBaseGPU = new CalcBaseGPU()

      return calcBaseGPU.getDayGain(coin)
    }
  }

  get gainBaseGPUWeek() {
    return (coin: ICryptoItem) => {
      const calcBaseGPU = new CalcBaseGPU()

      return calcBaseGPU.getWeekGain(coin)
    }
  }

  get gainBaseGPUMonth() {
    return (coin: ICryptoItem) => {
      const calcBaseGPU = new CalcBaseGPU()

      return calcBaseGPU.getMonthGain(coin)
    }
  }

  get gainBaseHashrate24h() {
    return (coin: ISelectedCryptoItem) => {
      const calcBaseHashrate = new CalcBaseHashrate()
  
      return calcBaseHashrate.gain24h(coin)
    }
  }

  get gainBaseHashrate24hFiat() {
    return (coin: ISelectedCryptoItem) => {
      const calcBaseHashrate = new CalcBaseHashrate()
  
      return calcBaseHashrate.gain24hFiat(coin)
    }
  }

  get gainBaseHashrateDay() {
    return (coin: ISelectedCryptoItem) => {
      const calcBaseHashrate = new CalcBaseHashrate()

      return calcBaseHashrate.getDayGain(coin)
    }
  }

  get gainBaseHashrateWeek() {
    return (coin: ISelectedCryptoItem) => {
      const calcBaseHashrate = new CalcBaseHashrate()

      return calcBaseHashrate.getWeekGain(coin)
    }
  }

  get gainBaseHashrateMonth() {
    return (coin: ISelectedCryptoItem) => {
      const calcBaseHashrate = new CalcBaseHashrate()

      return calcBaseHashrate.getMonthGain(coin)
    }
  }
}

export { Calculate }