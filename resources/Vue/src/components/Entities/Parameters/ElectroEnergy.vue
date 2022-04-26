<template>
  <Card>
    <template #body>
      <template v-if="isAdvancedMode">
        <CardRow>
          <Row>
            <RowText :text="$t('powerConsumption')"/>
            <Input :disabled="!energyEnable" v-model="powerConsumptionControl"></Input>
            <RowText text="MWh"/>
            <MiniSwitcherUI v-if="!isHashrateMode" :activeText="$t('on')" :disableText="$t('off')" v-model="energyEnable" />
          </Row>
        </CardRow>
      </template>
      <CardRow>
        <Row>
          <RowText :text="$t('priceForKw')"/>
          <Input :disabled="!energyEnable" v-model="kWPriceControl"></Input>
          <RowText text="usd"/>
          <MiniSwitcherUI v-if="!isAdvancedMode" :activeText="$t('on')" :disableText="$t('off')" v-model="energyEnable" />
        </Row>
      </CardRow>
      <CardRow v-if="isAdvancedMode">
        <Row>
          <RowText :text="$t('workHours')"/>
          <Input :disabled="!energyEnable" v-model="hoursControl"></Input>
          <RowText :text="$t('hours')"/>
        </Row>
      </CardRow>
      <!-- <CardRow v-if="isHashrateMode && !isAdvancedMode">
        <Row>
          <RowText :text="$t('summaryEnergyComsumption')"/>
          <Input v-model="summaryEnergyConsumptionControl"></Input>
          <RowText text="kWh"/>
        </Row>
      </CardRow> -->
    </template>
    <template #footer v-if="isAdvancedMode">
      <CardRow>
        <Row>
          <RowText :text="$t('sum')"/>
          <Output promoted :value="getEnergySum()"></Output>
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
import { Calculate } from '../../../store/modules/Calculate';
import { Crypto } from '../../../store/modules/Crypto';

import Card from '../../Elements/Card.vue';
import CardRow from '../../Elements/Card/Row.vue';
import Row from '../../Elements/Row.vue';
import RowText from '../../Elements/Row/Text.vue';
import Input from '../../Elements/Input.vue';
import Output from '../../Elements/Output.vue';
import ModeMixin from '../../mixins/mode';
import MiniSwitcherUI from '../../UI/MiniButton.vue';
import { DataPort } from '../../../store/modules/helpers/DataPort';

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
export default class ElectroEnergy extends mixins(ModeMixin) {
  get hoursControl() {
    return String(parametersModule.energy.workHours)
  }
  set hoursControl(value: string) {
    parametersModule.updateParameter({ key: 'energy.workHours', value: value })
  }

  get powerConsumptionControl() {
    const hasActual = parametersModule.register.some(token => token === 'energy.powerConsumption')

    if(hasActual || this.isHashrateMode) {
      return String(parametersModule.energy.powerConsumption)
    }
    else {
      if(cryptoModule.current) {
        const devicesSummaryConsumption = calcModule.devicesPowerConsumptionAdvancedGPU(cryptoModule.current)
        return (devicesSummaryConsumption / 1000000).toFixed(5)
      }
      else return "0"
    }
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

  // get summaryEnergyConsumptionControl() {
  //   return String(parametersModule.energy.kWPrice)
  // }
  // set summaryEnergyConsumptionControl(value: string) {
  //   parametersModule.updateParameter({ key: 'energy.summaryPowerConsumption', value: value })
  // }

  getEnergySum() {
    const current = cryptoModule.current
    if(current) {
      return calcModule.energyConsumptionSumAdvancedGPU(current).toFixed(2)
    }
    else return "0.00"
  }

  get energyEnable() {
    return parametersModule.energy.isEnable
  }

  set energyEnable(value: boolean) {
    parametersModule.updateEnergyIsEnable(value)
  }
}
</script>