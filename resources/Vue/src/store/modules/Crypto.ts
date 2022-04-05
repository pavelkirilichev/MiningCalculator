import { Module, VuexModule } from 'vuex-module-decorators';
import crypto from '../../mock/crypto';

interface ICryptoItem {
  id: number,
  title: string,
  unknown: string,
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
}

export { Crypto, ICryptoItem }