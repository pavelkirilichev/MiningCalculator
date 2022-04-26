import Vue from 'vue'
import Vuex from 'vuex'
import { GPU } from './modules/GPU';
import { Parameters } from './modules/Parameters'
import { Crypto } from './modules/Crypto'
import { Sum } from './modules/Sum'
import { Hashrate } from './modules/Hashrate'
import { Calculate } from './modules/Calculate'
import { getModule } from 'vuex-module-decorators';

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
    Hashrate
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
      state.Parameters.energy.isEnable = true
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

export {
  gpuModule,
  cryptoModule,
  parametersModule,
  hashrateModule
}