import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import currency from '../../mock/currency';
// import { CurrencyService } from '../../services/CurrencyService';

@Module({
  stateFactory: true,
  namespaced: true,
  name: 'Currency'
})
class Currency extends VuexModule {
  list: Array<any> = currency
  current: any | null = currency.find(item => item.currency === 'USD')

  @Action
  getAll(search?: string) {
    
  }

  @Mutation
  setList(data: any[]) {
    this.list = data
  }

  @Mutation
  updateCurrent(id: string) {
    this.current = this.list.find(item => item.id === id || item.key === id)
  }
}

export { Currency }