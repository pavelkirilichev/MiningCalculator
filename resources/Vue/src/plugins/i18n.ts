import VueI18n from 'vue-i18n';
import Vue from 'vue';

Vue.use(VueI18n)

const messages = {
  en: {
    mainTitle: 'Выбор калькулятора'
  },
  ru: {
    mainTitle: 'Choose calculator'
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: document.documentElement.lang, // set locale
  messages, // set locale messages
})

export { 
  i18n
 }