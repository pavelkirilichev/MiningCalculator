import Vue from 'vue'

import App from './src/App.vue'

import { i18n } from './src/plugins/i18n'
import store from './src/store/main'

new Vue({
  i18n,
  store,
  render: h => h(App)
}).$mount("#app")
