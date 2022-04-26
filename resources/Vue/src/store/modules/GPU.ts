import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators';

import { GPUService } from '../../services/GPUService';
import { AlgorithmService } from '../../services/AlgorithmService';
import { cryptoModule } from '../main';

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
  // list: Array<IGPUItem> = gpu.map(device => ({
  //   ...device,
  //   algorithms: Object.entries(device.algorithms).map(([key, value]) => ({ ...value, key }))
  // }))
  list: IGPUItem[] = []
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

    const algorithmSet = new Set<string>()

    this.selected.forEach(device => {
      device.algorithms.forEach(alg => {
        algorithmSet.add(alg.key)
      })
    })

    cryptoModule.update(Array.from(algorithmSet))
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
      this.remove(item.id)

      const algorithmSet = new Set<string>()

      this.selected.forEach(device => {
        device.algorithms.forEach(alg => {
          algorithmSet.add(alg.key)
        })
      })

      cryptoModule.update([])
    }
  }

  @Mutation
  setList(data: IGPUItem[]) {
    this.list = data
  }

  @Mutation
  remove(id: string) {
    const index = this.selected.findIndex(item => item.id === id)
    this.selected.splice(index, 1)
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
    const gpuReq = new GPUService().getAll(search).then(res => {
      if (res.status) {
        const gpuData = res.data

        new AlgorithmService().getByIdArray(gpuData.map(item => item.id)).then(_res => {
          if (_res.status) {
            const algorithms = _res.data
            this.context.commit('setList', gpuData.map(item => ({
              ...item,
              algorithms: algorithms.filter(alg => alg.hardware_id === item.id).map(alg => ({
                ...alg,
                key: alg.hardware_name
              }))
            })))
          }
        }).catch(err => { })
      }
    }).catch(err => {})
    
    return gpuReq
  }
}

export {
  IGPUItem,
  Algorithm,
  SelectedIGPUItem
}