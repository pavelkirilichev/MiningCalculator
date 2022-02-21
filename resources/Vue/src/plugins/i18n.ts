import VueI18n from 'vue-i18n';
import Vue from 'vue';

Vue.use(VueI18n)

const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ru: {
    message: {
      hello: 'Привет мир'
    }
  }
}

type MessagesSchema = typeof messages

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'ru', // set locale
  messages, // set locale messages
})

export { 
  i18n
 }