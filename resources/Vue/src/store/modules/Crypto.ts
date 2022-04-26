import { Module, VuexModule, Mutation, getModule, Action } from 'vuex-module-decorators';
import crypto from '../../mock/crypto';
import { CoinsService } from '../../services/CoinsService';
import store, { gpuModule } from '../main';
import { GPUHelper } from './helpers/GPUHelper';

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

let t: any

@Module({
  stateFactory: true,
  namespaced: true,
  name: 'Crypto'
})
class Crypto extends VuexModule {
  list: Array<ISelectedCryptoItem> = crypto.map(coin => ({
    ...coin,
    mhS: 1,
    count: 1
  }))
  selected: ISelectedCryptoItem[] = []
  activeId: string = ''
  tmpFilter: string = ''

  get filteredByDevices() {
    return this.list.filter(coin => gpuModule.selected.length && gpuModule.selected.every(device => GPUHelper.findAlgorithmByCoin(coin, device)))
  }

  get filteredByActive() {
    return this.selected
  }

  get listToSelect() {
    return this.list.filter(item => this.selected[0]?.id !== item.id)
  }

  get current() {
    return this.selected.find(coin => coin.id === this.activeId)
  }

  @Mutation
  addSelected(id: ICryptoItem['id']) {
    const item = this.list.find(item => item.id === id)
    if (!item) return

    this.selected = []
    
    this.selected.push({
      ...item,
      mhS: 1,
      count: 1
    })
    this.activeId = id
    // this.current = { ...item, count: 1, mhS: 1 }
    // this.activeId = id
  }

  @Mutation
  updateActiveId(id: string) {
    this.activeId = id
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

  @Mutation
  updateItemCount({ type, id, value }: { type: 'plus' | 'minus' | 'input', id: string, value: any }) {
    const item = this.selected.find(item => item.id === id)
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

    if (item.count === 0) {
      const index = this.selected.findIndex(item => item.id === id)
      this.selected.splice(index, 1)
    }
  }

  @Mutation
  setList(data: ICryptoItem[]) {
    this.list = data.map(coin => {
      return {
        ...coin,
        mhS: 1,
        count: 1
      }
    })
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
        this.context.commit('setList', res.data)
      }
    }).catch(err => {})
  }
}

export { Crypto, ICryptoItem, ISelectedCryptoItem }