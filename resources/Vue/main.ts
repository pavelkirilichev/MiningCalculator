import Vue from 'vue'

import App from './src/App.vue'

import { i18n } from './src/plugins/i18n'

new Vue({
  i18n,
  render: h => h(App)
}).$mount("#app")
