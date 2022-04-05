<template>
  <Card>
    <template #body>
      <CardRow>
        <Row>
          <RowText text="Стоимость фермы"/>
          <Input v-model="farmCostControl"></Input>
          <RowText text="usd"/>
        </Row>
      </CardRow>
      <CardRow>
        <Row>
          <RowText text="Стоимость каркаса"/>
          <Input v-model="cascadeCostControl"></Input>
          <RowText text="usd"/>
        </Row>
      </CardRow>
    </template>
    <template #footer>
      <CardRow>
        <Row>
          <RowText text="Полная стоимость фермы"/>
          <Output promoted v-model="farmFullCost"></Output>
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
import RowText from '../../Elements/Row/Text.vue';
import Input from '../../Elements/Input.vue';
import Output from '../../Elements/Output.vue';
import Row from '../../Elements/Row.vue';

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
export default class Farm extends Vue {
  get farmCostControl() {
    return String(parametersModule.farm.farmCost)
  }
  set farmCostControl(value: string) {
    parametersModule.updateParameter({ key: 'farm.farmCost', value: value })
  }
  get cascadeCostControl() {
    return String(parametersModule.farm.cascadeCost)
  }
  set cascadeCostControl(value: string) {
    parametersModule.updateParameter({ key: 'farm.cascadeCost', value: value })
  }

  get farmFullCost() {
    return parametersModule.farmFullCost
  }
}
</script>