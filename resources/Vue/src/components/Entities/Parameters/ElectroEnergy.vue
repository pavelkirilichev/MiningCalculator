<template>
  <Card>
    <template #body>
      <template v-if="isHashrateMode">
        <CardRow>
          <Row>
            <RowText :text="$t('powerConsumption')"/>
            <Input v-model="powerConsumptionControl"></Input>
            <RowText text="MWh"/>
          </Row>
        </CardRow>
      </template>
      <CardRow>
        <Row>
          <RowText :text="$t('priceForKw')"/>
          <Input v-model="kWPriceControl"></Input>
          <RowText text="usd"/>
        </Row>
      </CardRow>
      <CardRow v-if="isAdvancedMode">
        <Row>
          <RowText :text="$t('workHours')"/>
          <Input v-model="hoursControl"></Input>
          <RowText :text="$t('hours')"/>
        </Row>
      </CardRow>
    </template>
    <template #footer v-if="isAdvancedMode">
      <CardRow>
        <Row>
          <RowText :text="$t('sum')"/>
          <Output promoted v-model="energySum"></Output>
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
export default class ElectroEnergy extends mixins(ModeMixin) {
  get hoursControl() {
    return String(parametersModule.energy.workHours)
  }
  set hoursControl(value: string) {
    parametersModule.updateParameter({ key: 'energy.workHours', value: value })
  }

  get powerConsumptionControl() {
    return String(parametersModule.energy.powerConsumption)
  }

  set powerConsumptionControl(value: string) {
    parametersModule.updateParameter({ key: 'energy.powerConsumption', value: value })
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