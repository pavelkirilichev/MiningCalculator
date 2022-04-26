import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import crypto from '../../mock/crypto';
import { CoinsService } from '../../services/CoinsService';

class Order {
  stack: (() => Promise<any>)[] = []

  constructor() {
    this.loop()
  }

  async loop() {
    let i = 0;
    const filter: number[] = []
    for (const fn of this.stack) {
      try {
        await fn()
        filter.push(i)
        i++
      }
      catch {
        filter.push(i)
        i++
      }
    }

    this.stack = this.stack.filter((_, index) => !filter.find(i => index === i))  

    setTimeout(() => this.loop(), 200)
  }

  add(fn: any) {
    this.stack.push(fn)
  }
}

const order = new Order()

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
  list: Array<ICryptoItem> = crypto
  current: ICryptoItem | null = null

  @Action
  getAll(search?: string) {
    return new CoinsService().getAll(search).then(res => {
      if (res.status) {
        this.context.commit('setList', res.data)
      }
    }).catch(err => {})
  }

  @Action
  getByAlgorithms(algorithms: string[]) {
    return new CoinsService().getByAlgorithmArray(algorithms).then(res => {
      if (res.status) {
        this.context.commit('setList', res.data)
      }
    }).catch(err => {})
  }

  @Mutation
  setList(data: ICryptoItem[]) {
    this.list = data
  }

  @Mutation
  updateCurrent(id: string) {
    const item = this.list.find(coin => coin.id === id)
    if (item) {
      this.current = item
    }
  }

  @Action
  update(params: string[]) {
    this.getByAlgorithms(params).then(() => {
      this.updateHandle()
    })
  }

  @Mutation
  updateHandle() {
    if (this.list.length === 1) {
      this.updateCurrent(this.list[0].id)
    }
  }
}

export { Crypto, ICryptoItem, ISelectedCryptoItem }