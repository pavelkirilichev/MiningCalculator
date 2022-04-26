<template>
  <header class="header page__header" :class="{ 'header--shifted': scrolled }">
    <div class="header__inner container">
      <div class="header__block">
        <div class="header__logo">
          <img class="logo logo--full header__logo-img" :src="require('../../../../img/logo2.svg')"/>
        </div>
      </div>
      <div class="header__block">
        <div class="header__langs">
          <UIDropdown :text="mockLangs.find(lang => lang.id === langActiveId).title" @change="langActiveId = $event.id" :list="mockLangs"></UIDropdown>
        </div>
        <div class="header__currency">
          <div class="header__icon">
            <img src="/build/img/coins.svg" alt="" class="">
          </div>
          <UIDropdown :text="currentCurrency.title" @change="currencyHandler" :list="mockCurrency"></UIDropdown>
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
import { getModule } from 'vuex-module-decorators';
import { Currency } from '../../store/modules/Currency';
import store from '../../store/main';

const currencyModule = getModule(Currency, store)

@Component({
  components: {
    UIDropdown
  }
})
export default class Header extends Vue {
  @Prop({ type: Boolean }) scrolled!: boolean
  mockLangs = mockLangs

  get mockCurrency() {
    return currencyModule.list
  }

  get currentCurrency() {
    return currencyModule.current
  }

  currActiveId = 1
  langActiveId = 1

  currencyHandler(item: any) {
    currencyModule.updateCurrent(item.id)
  }

  created() {
    this.langActiveId = this.mockLangs.find(lang => lang.key === document.documentElement.lang)!.id
  }
}
</script>