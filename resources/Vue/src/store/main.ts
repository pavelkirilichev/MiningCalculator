import Vue from 'vue'
import Vuex from 'vuex'
import { GPU } from './modules/GPU';
import { Parameters } from './modules/Parameters'
import { Crypto } from './modules/Crypto'
import { Sum } from './modules/Sum'
import { Hashrate } from './modules/Hashrate'
import { Currency } from './modules/Currency'
import { Calculate } from './modules/Calculate'
import { getModule } from 'vuex-module-decorators';

// @ts-ignore
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

Vue.use(Vuex)

enum Modes {
  BASE_MODE = 0,
  ADVANCED_MODE = 1
}

enum DataMode {
  BASE_MODE = 0,
  HASH_MODE = 1
}

const store = new Vuex.Store({
  state: {
    mode: Modes.ADVANCED_MODE,
    dataMode: DataMode.BASE_MODE,
    loading: false,
  },
  modules: {
    GPU,
    Parameters,
    Crypto,
    Sum,
    Calculate,
    Hashrate,
    Currency
  },
  getters: {
    mode: ({ mode }) => mode,
    dataMode: ({ dataMode }) => dataMode
  },
  mutations: {
    setMode(state, mode: string) {
      state.mode = mode
    },
    setDataMode(state, mode: string) {
      state.dataMode = mode
    }
  }
})

export default store
export {
  DataMode,
  Modes
}
const gpuModule = getModule(GPU, store)
const cryptoModule = getModule(Crypto, store)
const parametersModule = getModule(Parameters, store)
const hashrateModule = getModule(Hashrate, store)
const currencyModule = getModule(Currency, store)

export {
  gpuModule,
  cryptoModule,
  parametersModule,
  hashrateModule,
  currencyModule
}