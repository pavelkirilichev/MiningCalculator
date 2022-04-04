<template>
  <Card>
    <template #body>
      <CardRow>
        <CardText text="Цена за kW"/>
        <CardInput v-model="kWPriceControl"></CardInput>
        <CardText text="usd"/>
      </CardRow>
      <CardRow>
        <CardText text="Часы работы"/>
        <CardInput v-model="hoursControl"></CardInput>
        <CardText text="часов"/>
      </CardRow>
    </template>
    <template #footer>
      <CardRow>
        <CardText text="Сумма"/>
        <CardOutput promoted v-model="energySum"></CardOutput>
        <CardText text="usd"/>
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
import CardText from '../../Elements/Card/Text.vue';
import CardInput from '../../Elements/Card/Input.vue';
import CardOutput from '../../Elements/Card/Output.vue';

const parametersModule = getModule(Parameters, store)

@Component({
  components: {
    Card,
    CardRow,
    CardText,
    CardInput,
    CardOutput
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