import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

import gpu from '../../mock/gpu'

interface Algorithm {
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
  list: Array<IGPUItem> = gpu
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
  updateItemCount({ type, id }: { type: 'plus' | 'minus', id: string }) {
    const item = this.selected.find(o => o.id === id)
    if (!item) return
    
    switch (type) {
      case 'minus':
        item.count--
        break;
      case 'plus':
        item.count++
    }
  }
}

export {
  IGPUItem,
  SelectedIGPUItem
}