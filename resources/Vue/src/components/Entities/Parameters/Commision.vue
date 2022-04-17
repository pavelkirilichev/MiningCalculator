<template>
  <Card>
    <template #body>
      <CardRow>
        <Row>
          <RowText :text="$t('pullCommission')"/>
          <Input v-model="pullCommissionControl" placeholder="1.4"></Input>
          <RowText text="%"/>
        </Row>
      </CardRow>
      <CardRow>
        <Row>
          <RowText :text="$t('transactionCommission')" :addon="' (из ETH в USD)'"/>
          <Input v-model="transactionCommissionControl"></Input>
          <RowText text="%"/>
        </Row>
      </CardRow>
      <CardRow>
        <Row>
          <RowText :text="$t('transferCommission')"/>
          <Input v-model="transferCommissionControl"></Input>
          <RowText text="%"/>
          <Input v-model="transferCommissionFixControl"></Input>
          <RowText text="usd"/>
          <UIHint />
        </Row>
      </CardRow>
      <CardRow>
        <Row>
          <RowText :text="$t('osSubscription')"/>
          <Input v-model="osSubscriptionControl"></Input>
          <RowText text="%"/>
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
import UIHint from '../../UI/Hint.vue';

const parametersModule = getModule(Parameters, store)

@Component({
  components: {
    Card,
    CardRow,
    Row,
    RowText,
    Input,
    Output,
    UIHint
  }
})
export default class Commision extends mixins(ModeMixin) {
  get pullCommissionControl() {
    return String(parametersModule.commissions.pullCommission || '')
  }

  set pullCommissionControl(value: string) {
    parametersModule.updateParameter({ key: 'commissions.pullCommission', value: value })
  }

  get transactionCommissionControl() {
    return String(parametersModule.commissions.transactionCommission)
  }

  set transactionCommissionControl(value: string) {
    parametersModule.updateParameter({ key: 'commissions.transactionCommission', value: value })
  }

  get transferCommissionControl() {
    return String(parametersModule.commissions.transferCommission)
  }

  set transferCommissionControl(value: string) {
    parametersModule.updateParameter({ key: 'commissions.transferCommission', value: value })
  }

  get transferCommissionFixControl() {
    return String(parametersModule.commissions.transferCommissionFix)
  }

  set transferCommissionFixControl(value: string) {
    parametersModule.updateParameter({ key: 'commissions.transactionCommissionFix', value: value })
  }

  get osSubscriptionControl() {
    return String(parametersModule.commissions.subscription)
  }

  set osSubscriptionControl(value: string) {
    parametersModule.updateParameter({ key: 'commissions.osSubscription', value: value })
  }
}
</script>