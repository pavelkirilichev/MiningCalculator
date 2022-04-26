import { Module, Mutation, VuexModule, getModule, Action } from 'vuex-module-decorators';

import gpu from '../../mock/gpu'
import { GPUService } from '../../services/GPUService';
import { cryptoModule } from '../main';
import { CryptoHelper } from './helpers/CryptoHelper';

interface Algorithm {
  key: string
  power: number,
  speed: number
}
interface IGPUItem {
  id: string,
  name: string,
  url: string,
  type: string,
  brand: string,
  algorithms: Algorithm[]
}

interface SelectedIGPUItem extends IGPUItem {
  count: number
}

let t: any;
@Module({
  stateFactory: true,
  namespaced: true,
  name: 'GPU'
})
export class GPU extends VuexModule {
  list: Array<IGPUItem> = gpu.map(device => ({
    ...device,
    algorithms: Object.entries(device.algorithms).map(([key, value]) => ({ ...value, key }))
  }))
  selected: Array<SelectedIGPUItem> = []
  tmpFilter: string = ''

  get listToSelect() {
    return this.list.filter(item => !this.selected.find(_item => _item.id === item.id))
  }

  @Mutation
  addSelected(id: IGPUItem['id']) {
    const item = this.list.find(item => item.id === id)
    if (!item) return
    
    this.selected.push({
      ...item,
      count: 1
    })

    const coins = CryptoHelper.findCoinByDevices(cryptoModule.list, this.selected)

    if (coins.length === 1) {
      cryptoModule.addSelected(coins[0].id)
    }
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
    const item = this.selected.find(o => o.id === id)
    if (!item) return
    
    switch (type) {
      case 'minus':
        item.count--
        break;
      case 'plus':
        item.count++
        break;
      case 'input':
        if (value) {
          item.count = isNaN(value) ? 0 : Number(value)
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
  setList(data: IGPUItem[]) {
    this.list = data.map(device => {
      const algorithms = device.algorithms
      
      return {
        ...device,
        algorithms: Object.entries(algorithms).map(([key, value]) => ({ ...value, key }))
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
    return new GPUService().getAll(search).then(res => {
      if (res.status) {
        this.context.commit('setList', res.data)
      }
    }).catch(err => {})
  }
}

export {
  IGPUItem,
  Algorithm,
  SelectedIGPUItem
}