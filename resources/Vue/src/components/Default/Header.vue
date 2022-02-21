<template>
  <header class="header page__header">
    <div class="header__inner container">
      <div class="header__block">
        <div class="header__logo">
          <div class="logo header__logo-img"></div>
          <div class="header__logo-text">MiningCalculator</div>
        </div>
      </div>
      <div class="header__block">
        <div class="header__langs">
          <UIDropdown :text="mockLangs[0].title"></UIDropdown>
        </div>
        <div class="header__currency">
          <div class="header__icon">
            <img src="/build/img/coins.svg" alt="" class="">
          </div>
          <UIDropdown :text="mockCurrency[0].title"></UIDropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
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
}
</script>