import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import crypto from '../../mock/crypto';

interface ICryptoItem {
  id: number,
  name: string,
  name_abb: string,
  course: number,
  img: string,
  gain: {
    dayCrypto: number,
    dayFiat: number,
    monthCrypto: number,
    monthFiat: number
  }
}

@Module({
  stateFactory: true,
  namespaced: true,
  name: 'Crypto'
})
class Crypto extends VuexModule {
  list: Array<ICryptoItem> = crypto
  activeId: number = 1

  get current() {
    return this.list.find(item => item.id === this.activeId)
  }

  @Mutation
  updateActiveId(id: number) {
    this.activeId = id
  }
}

export { Crypto, ICryptoItem }