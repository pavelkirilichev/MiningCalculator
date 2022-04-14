import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import crypto from '../../mock/crypto';

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
  selected: Array<ISelectedCryptoItem> = []
  activeId: string = ''
  tmpFilter: string = ''

  get filteredList() {
    return this.filteredByName
  }

  get filteredByName() {
    return this.listToSelect.filter(item => item.name.toLocaleLowerCase().includes(this.tmpFilter.toLocaleLowerCase()))
  }

  get listToSelect() {
    return this.list.filter(item => !this.selected.find(_item => _item.id === item.id))
  }

  get current() {
    return this.list.find(item => item.id === this.activeId)
  }

  @Mutation
  addSelected(id: ICryptoItem['id']) {
    const item = this.list.find(item => item.id === id)
    if (!item) return
    
    this.selected.push({
      ...item,
      mhS: 1,
      count: 1
    })
  }

  @Mutation
  updateActiveId(id: string) {
    this.activeId = id
  }

  @Mutation
  updateFilter(value: string) {
    this.tmpFilter = value
  }

  @Mutation
  updateItemCount({ type, id }: { type: 'plus' | 'minus', id: string }) {
    const item = this.selected.find(o => o.id === id)
    if (!item) return
    
    switch (type) {
      case 'minus':
        item.mhS--
        item.count--
        break;
      case 'plus':
        item.mhS++
        item.count++
    }
  }
}

export { Crypto, ICryptoItem }