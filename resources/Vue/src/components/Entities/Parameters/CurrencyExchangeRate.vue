<template>
  <Card>
    <template #body>
      <CardRow>
        <Row>
          <RowText :text="$t('cryptoActualPrice')"/>
          <Input :disabled="!currencyRateEnable" v-model="cryptoActualPriceControl"></Input>
          <RowText :text="currentCurrency.title"/>
          <!-- <MiniSwitcherUI :activeText="$t('on')" :disableText="$t('off')" v-model="currencyRateEnable" /> -->
        </Row>
      </CardRow>
      <CardRow>
        <Row>
          <RowText :text="$t('valueGrowthPercentage')" :addon="` (${$t('month')}/${$t('year')})`"/>
          <Input percentage hasNegative :disabled="!currencyRateEnable" v-if="isExchangeRateModeMonth" v-model="valueGrowthPercentageControlMonth"></Input>
          <Input percentage hasNegative :disabled="!currencyRateEnable" v-if="isExchangeRateModeYear" v-model="valueGrowthPercentageControlYear"></Input>
          <RowText text="%"/>
          <UIToggler :value="toggle" @change="toggleHandler" :text="$t('month')[0]" :textActive="$t('year')[0]" mini/>
        </Row>
      </CardRow>
    </template>
  </Card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import { mixins } from 'vue-class-component';

import store, { currencyModule, Modes } from '../../../store/main';
import { ExchangeRateModes, Parameters } from '../../../store/modules/Parameters';
import { Crypto } from '../../../store/modules/Crypto';

import Card from '../../Elements/Card.vue';
import CardRow from '../../Elements/Card/Row.vue';
import Row from '../../Elements/Row.vue';
import RowText from '../../Elements/Row/Text.vue';
import Input from '../../Elements/Input.vue';
import Output from '../../Elements/Output.vue';
import ModeMixin from '../../mixins/mode';
import UIToggler from '../../UI/Toggler.vue';
import MiniSwitcherUI from '../../UI/MiniButton.vue';
import { CurrencyHelper } from '../../../store/modules/helpers/CurrencyHelper';

const parametersModule = getModule(Parameters, store)
const cryptoModule = getModule(Crypto, store)

@Component({
  components: {
    Card,
    CardRow,
    Row,
    RowText,
    Input,
    Output,
    UIToggler,
    MiniSwitcherUI
  }
})
export default class CurrencyExchangeRate extends mixins(ModeMixin) {
  toggle = false

  get currentCurrency() {
    return currencyModule.current
  }

  toggleHandler() {
    this.toggle = !this.toggle

    if(this.toggle) {
      parametersModule.updateExchangeRateMode(ExchangeRateModes.YEAR)
    }
    else {
      parametersModule.updateExchangeRateMode(ExchangeRateModes.MONTH)
    }
  }

  get isExchangeRateModeMonth(): boolean {
    return parametersModule.exchangeRate.mode === ExchangeRateModes.MONTH
  }

  get isExchangeRateModeYear(): boolean {
    return parametersModule.exchangeRate.mode === ExchangeRateModes.YEAR
  }

  get cryptoActualPriceControl() {
    const hasActual = parametersModule.register.some(token => token === 'exchangeRate.actualPrice')
    const currentCurrency = cryptoModule.current
    if(hasActual) {
      return String(parametersModule.getParameter("exchangeRate.actualPrice", true))
    }

    if(currentCurrency) {
      console.log(currentCurrency.price, CurrencyHelper.convertToCurrentCurrency(currentCurrency.price))
      // return String(CurrencyHelper.convertToCurrentCurrency(currentCurrency.price))
      return String(currentCurrency.price)
    }

    return "0"
  }

  set cryptoActualPriceControl(value: string) {
    parametersModule.updateParameter({ key: 'exchangeRate.actualPrice', value, isRate: true })
  }

  get valueGrowthPercentageControlMonth() {
    return String(parametersModule.getParameter("exchangeRate.valueGrowthPercentageMonth"))
  }

  set valueGrowthPercentageControlMonth(value: string) {
    parametersModule.updateParameter({ key: 'exchangeRate.valueGrowthPercentageMonth', value })
  }

  get valueGrowthPercentageControlYear() {
    return String(parametersModule.getParameter("exchangeRate.valueGrowthPercentageYear"))
  }

  set valueGrowthPercentageControlYear(value: string) {
    parametersModule.updateParameter({ key: 'exchangeRate.valueGrowthPercentageYear', value })
  }

  get currencyRateEnable() {
    return parametersModule.exchangeRate.isEnable
  }

  set currencyRateEnable(value: boolean) {
    parametersModule.updateExchangeRateIsEnable(value)
  }
}
</script>