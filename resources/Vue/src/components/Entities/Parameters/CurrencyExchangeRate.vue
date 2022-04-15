<template>
  <Card>
    <template #body>
      <CardRow>
        <Row>
          <RowText :text="$t('cryptoActualPrice')"/>
          <Output :value="cryptoActualPriceControl"></Output>
          <RowText text="usd"/>
        </Row>
      </CardRow>
      <CardRow>
        <Row>
          <RowText :text="$t('valueGrowthPercentage')" :addon="` (${$t('month')}/${$t('year')})`"/>
          <Output :value="valueGrowthPercentageControl"></Output>
          <RowText text="usd"/>
          <UIToggler :value="toggle" @change="toggle = !toggle" :text="$t('month')[0]" :textActive="$t('year')[0]" mini/>
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

import store, { Modes } from '../../../store/main';
import { Parameters } from '../../../store/modules/Parameters';

import Card from '../../Elements/Card.vue';
import CardRow from '../../Elements/Card/Row.vue';
import Row from '../../Elements/Row.vue';
import RowText from '../../Elements/Row/Text.vue';
import Input from '../../Elements/Input.vue';
import Output from '../../Elements/Output.vue';
import ModeMixin from '../../mixins/mode';
import UIToggler from '../../UI/Toggler.vue';

const parametersModule = getModule(Parameters, store)

@Component({
  components: {
    Card,
    CardRow,
    Row,
    RowText,
    Input,
    Output,
    UIToggler
  }
})
export default class CurrencyExchangeRate extends mixins(ModeMixin) {
  toggle = false

  get cryptoActualPriceControl() {
    return String(parametersModule.exchangeRate.actualPrice)
  }

  get valueGrowthPercentageControl() {
    return String(parametersModule.exchangeRate.valueGrowthPercentage)
  }
}
</script>