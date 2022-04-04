<template>
  <Card>
    <template #body>
      <CardRow>
        <CardText text="Стоимость фермы"/>
        <CardInput v-model="farmCostControl"></CardInput>
        <CardText text="usd"/>
      </CardRow>
      <CardRow>
        <CardText text="Стоимость каркаса"/>
        <CardInput v-model="cascadeCostControl"></CardInput>
        <CardText text="usd"/>
      </CardRow>
    </template>
    <template #footer>
      <CardRow>
        <CardText text="Полная стоимость фермы"/>
        <CardOutput promoted v-model="farmFullCost"></CardOutput>
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