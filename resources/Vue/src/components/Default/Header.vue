<template>
  <header class="header page__header" :class="{ 'header--shifted': scrolled }">
    <div class="header__inner container">
      <div class="header__block">
        <div class="header__logo">
          <div class="logo header__logo-img"></div>
          <div class="header__logo-text">MiningCalculator</div>
        </div>
      </div>
      <div class="header__block">
        <div class="header__langs">
          <UIDropdown :text="mockLangs[langActiveId - 1].title" @change="langActiveId = $event.id" :list="mockLangs"></UIDropdown>
        </div>
        <div class="header__currency">
          <div class="header__icon">
            <img src="/build/img/coins.svg" alt="" class="">
          </div>
          <UIDropdown :text="mockCurrency[currActiveId - 1].title" @change="currActiveId = $event.id" :list="mockCurrency"></UIDropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import UIDropdown from '../UI/Dropdown.vue';

import mockCurrency from '../../mock/currency'
import mockLangs from '../../mock/langs'

@Component({
  components: {
    UIDropdown
  }
})
export default class Header extends Vue {
  mockLangs = mockLangs
  mockCurrency = mockCurrency

  currActiveId = 1
  langActiveId = 1

  @Prop({ type: Boolean }) scrolled!: boolean
}
</script>