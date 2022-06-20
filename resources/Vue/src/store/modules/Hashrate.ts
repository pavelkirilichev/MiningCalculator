import { Module, VuexModule, Mutation, getModule, Action } from 'vuex-module-decorators';
import crypto from '../../mock/crypto';
import { CoinsService } from '../../services/CoinsService';
import { cryptoModule } from '../main';
import { ICryptoItem, ISelectedCryptoItem } from './Crypto';
import { filterCryptoByAlgorithm } from './helpers/AlgorithmFilterHelper';

let t: any

@Module({
  stateFactory: true,
  namespaced: true,
  name: 'Hashrate'
})
class Hashrate extends VuexModule {
  // list: Array<ICryptoItem> = crypto.map(coin => ({
  //   ...coin,
  //   mhS: 1,
  //   count: 1
  // }))
  list: ICryptoItem[] = []
  current: ISelectedCryptoItem | null = null
  tmpFilter: string = ''


  @Action
  updateCurrent(id: ICryptoItem['id']) {
    this.context.commit("selectedMutation", id)
    this.context.dispatch('updateCrypto')
  }

  @Mutation
  resetCurrent() {
    this.current = null
  }

  @Mutation
  selectedMutation(id: string) {
    const item = this.list.find(item => item.id === id)
    if (!item) return
    
    this.current = {
      ...item,
      mhS: 1,
      count: 1
    }
  }

  @Action
  updateCrypto() {
    cryptoModule.updateHashrate(this.current ? [this.current.algorithm] : [])
  }

  @Mutation
  updateFilterString(value: string) {
    this.tmpFilter = value
  }

  @Action
  updateFilter(value: string) {
    this.context.commit('updateFilterString', value)
    this.context.dispatch('update', this.tmpFilter)
  }

  @Action
  updateItemCount({ type, id, value }: { type: 'plus' | 'minus' | 'input', id: string, value: any }) {
    if (!value) value = 0

    const item = this.current
    if (!item) return
    
    switch (type) {
      case 'minus':
        item.count--
        item.mhS--
        break;
      case 'plus':
        item.count++
        item.mhS++
        break;
      case 'input':
        if (value) {
          item.count = isNaN(value) ? 0 : Number(value)
          item.mhS = isNaN(value) ? 0 : Number(value)
        }
        else return
        break;
    }

    if (item.count <= 0) {
      this.context.commit('resetCurrent')
      this.context.dispatch('updateCrypto')
    }
  }

  @Mutation
  setList(data: ICryptoItem[]) {
    this.list = data
  }

  @Action
  update(search?: string) {
    clearTimeout(t)
    t = setTimeout(() => {
      this.context.dispatch('getAll', search)
    }, 500)
  }

  @Action
  getAll(search?: string) {
    new CoinsService().getAll(search).then(res => {
      if (res.status) {
        this.context.commit('setList', filterCryptoByAlgorithm(res.data))
      }
    }).catch(err => {})
  }
}

export { Hashrate }