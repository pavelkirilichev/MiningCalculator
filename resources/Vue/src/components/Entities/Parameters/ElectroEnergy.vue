<template>
  <Card>
    <template #body>
      <CardRow>
        <Row>
          <RowText text="Цена за kW"/>
          <Input v-model="kWPriceControl"></Input>
          <RowText text="usd"/>
        </Row>
      </CardRow>
      <CardRow>
        <Row>
          <RowText text="Часы работы"/>
          <Input v-model="hoursControl"></Input>
          <RowText text="часов"/>
        </Row>
      </CardRow>
    </template>
    <template #footer>
      <CardRow>
        <Row>
          <RowText text="Сумма"/>
          <Output v-model="energySum"></Output>
          <RowText text="usd"/>
        </Row>
      </CardRow>
    </template>
  </Card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import store from '../../../store/main';
import { Parameters } from '../../../store/modules/Parameters';

import Card from '../../Elements/Card.vue';
import CardRow from '../../Elements/Card/Row.vue';
import Row from '../../Elements/Row.vue';
import RowText from '../../Elements/Row/Text.vue';
import Input from '../../Elements/Input.vue';
import Output from '../../Elements/Output.vue';

const parametersModule = getModule(Parameters, store)

@Component({
  components: {
    Card,
    CardRow,
    Row,
    RowText,
    Input,
    Output
  }
})
export default class ElectroEnergy extends Vue {
  get hoursControl() {
    return String(parametersModule.energy.workHours)
  }
  set hoursControl(value: string) {
    parametersModule.updateParameter({ key: 'energy.workHours', value: value })
  }

  get kWPriceControl() {
    return String(parametersModule.energy.kWPrice)
  }
  set kWPriceControl(value: string) {
    parametersModule.updateParameter({ key: 'energy.kWPrice', value: value })
  }

  get energySum() {
    return parametersModule.energySum
  }
}
</script>