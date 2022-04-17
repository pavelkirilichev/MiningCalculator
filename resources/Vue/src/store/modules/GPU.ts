import { Module, Mutation, VuexModule, getModule, Action } from 'vuex-module-decorators';

import gpu from '../../mock/gpu'
import { GPUService } from '../../services/GPUService';
import store from '../main';

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

@Module({
  stateFactory: true,
  namespaced: true,
  name: 'GPU'
})
export class GPU extends VuexModule {
  list: Array<IGPUItem> = gpu.map(gpu => {
    return {
      ...gpu,
      algorithms: Object.entries(gpu.algorithms).map(([key, value]) => ({ ...value, key }))
    }
  })
  selected: Array<SelectedIGPUItem> = []
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

  @Mutation
  addSelected(id: IGPUItem['id']) {
    const item = this.list.find(item => item.id === id)
    if (!item) return
    
    this.selected.push({
      ...item,
      count: 1
    })
  }

  @Mutation
  updateFilter(value: string) {
    this.tmpFilter = value
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
  getAll() {
    return new GPUService().getAll().then(res => {
      if (res.status) {
        this.context.commit('setList', res.data)
      }
    })
  }
}

export {
  IGPUItem,
  Algorithm,
  SelectedIGPUItem
}