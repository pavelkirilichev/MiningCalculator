<template>
  <Card v-if="isAdvancedMode">
    <template #body>
      <CardRow>
        <Row>
          <RowText :text="$t('farmCost')"/>
          <Input :disabled="!farmCostEnable" v-model="farmCostControl"></Input>
          <RowText :text="currentCurrency.title"/>
          <MiniSwitcherUI :activeText="$t('on')" :disableText="$t('off')" v-model="farmCostEnable" />
        </Row>
      </CardRow>
      <CardRow>
        <Row>
          <RowText :text="$t('frameCost')"/>
          <Input :disabled="!farmCostEnable" v-model="frameCostControl"></Input>
          <RowText :text="currentCurrency.title"/>
        </Row>
      </CardRow>
    </template>
    <template #footer>
      <CardRow>
        <Row>
          <RowText :text="$t('fullFarmCost')"/>
          <Output v-if="farmCostEnable" promoted :value="getFarmFullCost()"></Output>
          <!-- <Input v-else :value="getFarmFullCost()"></Input> -->
          <RowText :text="currentCurrency.title"/>
        </Row>
      </CardRow>
    </template>
  </Card>
  <Card v-else></Card>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import store, { currencyModule } from '../../../store/main';

import Card from '../../Elements/Card.vue';
import CardRow from '../../Elements/Card/Row.vue';
import RowText from '../../Elements/Row/Text.vue';
import Input from '../../Elements/Input.vue';
import Output from '../../Elements/Output.vue';
import Row from '../../Elements/Row.vue';
import { mixins } from 'vue-class-component';
import ModeMixin from '../../mixins/mode';
import { Parameters } from '../../../store/modules/Parameters';
import { Calculate } from '../../../store/modules/Calculate';
import { Crypto } from '../../../store/modules/Crypto';
import MiniSwitcherUI from '../../UI/MiniButton.vue';

const parametersModule = getModule(Parameters, store)
const calcModule = getModule(Calculate, store)
const cryptoModule = getModule(Crypto, store)

@Component({
  components: {
    Card,
    CardRow,
    Row,
    RowText,
    Input,
    Output,
    MiniSwitcherUI
  }
})
export default class Farm extends mixins(ModeMixin) {
  get currentCurrency() {
    return currencyModule.current
  }

  get farmCostControl() {
    return String(parametersModule.getParameter("farm.farmCost", true))
  }

  set farmCostControl(value: string) {
    parametersModule.updateParameter({ key: 'farm.farmCost', value: value, isRate: true })
  }

  get frameCostControl() {
    return String(parametersModule.getParameter("farm.frameCost", true))
  }

  set frameCostControl(value: string) {
    parametersModule.updateParameter({ key: 'farm.frameCost', value: value, isRate: true })
  }

  getFarmFullCost() {
    return calcModule.farmFullCostAdvancedGPU().toFixed(2)
  }

  get farmCostEnable() {
    return parametersModule.farm.isEnable
  }

  set farmCostEnable(value: boolean) {
    parametersModule.updateIsFormCostEnabled(value)
  }
}
</script>