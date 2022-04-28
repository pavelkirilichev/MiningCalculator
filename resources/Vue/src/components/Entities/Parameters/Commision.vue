<template>
  <Card>
    <template v-if="isAdvancedMode" #body>
      <CardRow>
        <Row>
          <RowText :text="$t('pullCommission')"/>
          <Input percentage :disabled="!commissionEnable" v-model="pullCommissionControl"></Input>
          <RowText text="%"/>
          <MiniSwitcherUI :activeText="$t('on')" :disableText="$t('off')" v-model="commissionEnable" />
        </Row>
      </CardRow>
      <CardRow>
        <Row>
          <RowText :text="$t('transactionCommission')" :addon="' (из ETH в USD)'"/>
          <Input percentage :disabled="!commissionEnable" v-model="transactionCommissionControl"></Input>
          <RowText text="%"/>
        </Row>
      </CardRow>
      <CardRow>
        <Row>
          <RowText :text="$t('transferCommission')"/>
          <Input percentage :disabled="!commissionEnable" v-model="transferCommissionControl"></Input>
          <RowText text="%"/>
          <Input :disabled="!commissionEnable" v-model="transferCommissionFixControl"></Input>
          <RowText text="usd"/>
          <UIHint :text="$t('transferCommissionTooltip')" />
        </Row>
      </CardRow>
      <CardRow>
        <Row>
          <RowText :text="$t('osSubscription')"/>
          <Input :disabled="!commissionEnable" v-model="osSubscriptionControl"></Input>
          <RowText text="usd"/>
          <UIHint :text="$t('subscriptionCommissionTooltip')" />
        </Row>
      </CardRow>
    </template>
    <template v-else #body>
      <CardRow>
        <Row>
          <RowText :text="$t('generalCommission')"/>
          <Input :disabled="!commissionEnable" v-model="comissionControl"></Input>
          <RowText text="%"/>
          <MiniSwitcherUI :activeText="$t('on')" :disableText="$t('off')" v-model="commissionEnable" />
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
import MiniSwitcherUI from '../../UI/MiniButton.vue';

const parametersModule = getModule(Parameters, store)

@Component({
  components: {
    Card,
    CardRow,
    Row,
    RowText,
    Input,
    Output,
    UIHint,
    MiniSwitcherUI
  }
})
export default class Commision extends mixins(ModeMixin) {
  get pullCommissionControl() {
    return String(parametersModule.commissions.pullCommission)
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
    parametersModule.updateParameter({ key: 'commissions.transferCommissionFix', value: value })
  }

  get osSubscriptionControl() {
    return String(parametersModule.commissions.subscription)
  }

  set osSubscriptionControl(value: string) {
    parametersModule.updateParameter({ key: 'commissions.subscription', value: value })
  }

  get comissionControl() {
    return String(parametersModule.commissions.commission)
  }
  
  set comissionControl(value: string) {
    parametersModule.updateParameter({ key: 'commissions.commission', value: value })
  }

  get commissionEnable() {
    return parametersModule.commissions.isEnable
  }

  set commissionEnable(value: boolean) {
    parametersModule.updateCommissionIsEnable(value)
  }
}
</script>