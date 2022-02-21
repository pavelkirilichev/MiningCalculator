<template>
  <div class="app page" id="app">
    <Header></Header>
    <Main>
      <Hero></Hero>
      <Calculator />
    </Main>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Header from './components/Default/Header.vue'
import Main from './components/Default/Main.vue'
import Footer from './components/Default/Footer.vue'
import Hero from './components/Hero.vue';

import "./api/gpu"
import Calculator from './components/Calculator.vue';

@Component({
  components: {
    Header,
    Main,
    Hero,
    Calculator,
    Footer
  }
})
export default class App extends Vue {
  mounted() {

  }
}
</script>