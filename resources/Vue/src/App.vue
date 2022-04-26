<template>
  <div class="app page" id="app">
    <Header :scrolled="scrolled"></Header>
    <Main>
      <Hero></Hero>
      <Calculator />
      <AddInfo />
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

import "./api/client"

import Calculator from './components/Calculator.vue';
import AddInfo from './components/AddInfo.vue'
import { getModule } from 'vuex-module-decorators'

import store from './store/main'
import { Hashrate } from './store/modules/Hashrate'
import { GPU } from './store/modules/GPU'

const hashrateModule = getModule(Hashrate, store)
const gpuModule = getModule(GPU, store)

@Component({
  components: {
    Header,
    Main,
    Hero,
    Calculator,
    AddInfo,
    Footer
  }
})
export default class App extends Vue {
  scrolled = false

  mounted() {
    window.addEventListener("scroll", e => {
      const { scrollY: y } = window

      if(y > 0) {
        this.scrolled = true
      }
      else this.scrolled = false
    })

    gpuModule.getAll()
    hashrateModule.getAll()
  }
}
</script>