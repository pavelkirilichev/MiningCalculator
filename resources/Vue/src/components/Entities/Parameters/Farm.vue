<template>
  <Card v-if="isAdvancedMode">
    <template #body>
      <CardRow>
        <Row>
          <RowText :text="$t('farmCost')"/>
          <Input :disabled="!farmCostEnable" v-model="farmCostControl"></Input>
          <RowText text="usd"/>
          <MiniSwitcherUI :activeText="$t('on')" :disableText="$t('off')" v-model="farmCostEnable" />
        </Row>
      </CardRow>
      <CardRow>
        <Row>
          <RowText :text="$t('frameCost')"/>
          <Input :disabled="!farmCostEnable" v-model="frameCostControl"></Input>
          <RowText text="usd"/>
        </Row>
      </CardRow>
    </template>
    <template #footer>
      <CardRow>
        <Row>
          <RowText :text="$t('fullFarmCost')"/>
          <Output promoted :value="getFarmFullCost()"></Output>
          <RowText text="usd"/>
        </Row>
      </CardRow>
    </template>
  </Card>
  <Card v-else></Card>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import store from '../../../store/main';

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
  get farmCostControl() {
    return String(parametersModule.farm.farmCost)
  }

  set farmCostControl(value: string) {
    parametersModule.updateParameter({ key: 'farm.farmCost', value: value })
  }

  get frameCostControl() {
    return String(parametersModule.farm.frameCost)
  }

  set frameCostControl(value: string) {
    parametersModule.updateParameter({ key: 'farm.frameCost', value: value })
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