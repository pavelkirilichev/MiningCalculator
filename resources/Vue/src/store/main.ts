import Vue from 'vue'
import Vuex from 'vuex'
import { GPU } from './modules/GPU';
import { Parameters } from './modules/Parameters'
import { Crypto } from './modules/Crypto'

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
    dataMode: DataMode.BASE_MODE
  },
  modules: {
    GPU,
    Parameters,
    Crypto
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