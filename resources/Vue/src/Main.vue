<template>
  <Main>
    <Hero></Hero>
    <Calculator />
    <AddInfo />
  </Main>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

import Main from './components/Default/Main.vue'
import Hero from './components/Hero.vue';

import "./api/client"

import Calculator from './components/Calculator.vue';
import AddInfo from './components/AddInfo.vue'

@Component({
  components: {
    Calculator,
    AddInfo,
    Hero
  }
})
export default class MainVue extends Vue {}
</script>