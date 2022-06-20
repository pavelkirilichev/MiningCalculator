import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import crypto from '../../mock/crypto';
import { CoinsService } from '../../services/CoinsService';
import { DataMode } from '../main';

// class Order {
//   stack: (() => Promise<any>)[] = []

//   constructor() {
//     this.loop()
//   }

//   async loop() {
//     let i = 0;
//     const filter: number[] = []
//     for (const fn of this.stack) {
//       try {
//         await fn()
//         filter.push(i)
//         i++
//       }
//       catch {
//         filter.push(i)
//         i++
//       }
//     }

//     this.stack = this.stack.filter((_, index) => !filter.find(i => index === i))  

//     setTimeout(() => this.loop(), 200)
//   }

//   add(fn: any) {
//     this.stack.push(fn)
//   }
// }

// const order = new Order()

const blackList = ['KAWPOW', 'X11']

function filterByAlgorithm(array: ICryptoItem[]) {
  return array.filter(el => !blackList.some(alg => el.algorithm.toLowerCase() === alg.toLowerCase()))
}

interface ICryptoItem {
  coin: string,
  name: string,
  id: string,
  algorithm: string,
  type: string,
  network_hashrate: number,
  difficulty: number,
  reward: number,
  reward_unit: string,
  reward_block: number
  price: number,
  volume: number,
  updated: number
}

interface ISelectedCryptoItem extends ICryptoItem {
  mhS: number,
  count: number
}

@Module({
  stateFactory: true,
  namespaced: true,
  name: 'Crypto'
})
class Crypto extends VuexModule {
  hashrateList: Array<ICryptoItem> = []
  GPUList: Array<ICryptoItem> = []
  currentGPU: ICryptoItem | null = null
  currentHashrate: ICryptoItem | null = null
  mode: DataMode = DataMode.BASE_MODE

  get list() {
    return this.mode === DataMode.HASH_MODE ? this.hashrateList : this.GPUList
  }

  get current() {
    return this.mode === DataMode.HASH_MODE ? this.currentHashrate : this.currentGPU
  }

  // @Action
  // getAll(search?: string) {
  //   return new CoinsService().getAll(search).then(res => {
  //     if (res.status) {
  //       this.context.commit('setList', res.data)
  //     }
  //   }).catch(err => {})
  // }

  @Action
  getByAlgorithms(algorithms: string[]) {
    return new CoinsService().getByAlgorithmArray(algorithms).then(res => {
      if (res.status) {
        // this.context.commit('setList', res.data)
        return res.data
      }
    }).catch(err => {})
  }

  @Mutation
  setHashrateList(data: ICryptoItem[]) {
    this.hashrateList = data
  }

  @Mutation
  setGPUList(data: ICryptoItem[]) {
    this.GPUList = data
  }

  @Mutation
  updateCurrent(id: string) {
    if (this.mode === DataMode.HASH_MODE) {
      const item = this.hashrateList.find(coin => coin.id === id)
      if (item) {
        this.currentHashrate = item
      }
    }
    else {
      const item = this.GPUList.find(coin => coin.id === id)
      if(item) {
        this.currentGPU = item
      }
    }
  }

  @Action
  updateHashrate(params: string[]) {
    this.context.commit('resetHashrate')
    this.getByAlgorithms(params).then(data => {
      console.log(data)
      this.context.commit('setHashrateList', data)
      this.context.commit('updateHandle')
    })
  }

  @Action
  updateGPU(params: string[]) {
    this.context.commit('resetGPU')
    this.getByAlgorithms(params).then(data => {
      this.context.commit('setGPUList', data)
      this.context.commit('updateHandle')
    })
  }

  @Mutation
  resetHashrate() {
    this.currentHashrate = null
    this.hashrateList = []
  }

  @Mutation
  resetGPU() {
    this.currentGPU = null
    this.GPUList = []
  }

  @Mutation
  switch() {
    this.mode = this.mode === DataMode.HASH_MODE ? DataMode.BASE_MODE : DataMode.HASH_MODE
  }

  @Mutation
  updateHandle() {
    if (this.mode === DataMode.HASH_MODE) {
      if (this.hashrateList.length === 1) {
        this.currentHashrate = this.hashrateList[0]
      }
    }
    else {
      if (this.GPUList.length === 1) {
        this.currentGPU = this.GPUList[0]
      }
    }
  }
}

export { Crypto, ICryptoItem, ISelectedCryptoItem }