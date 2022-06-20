<template>
  <Card>
    <template #body>
      <template v-if="isAdvancedMode">
        <CardRow>
          <Row>
            <RowText :text="$t('powerConsumption')"/>
            <Input v-if="isHashrateMode" v-model="powerConsumptionControl"></Input>
            <Input v-else :disabled="!energyEnable" v-model="gpuPowerConsumptionControl"></Input>
            <RowText text="KWh"/>
            <MiniSwitcherUI v-if="!isHashrateMode" :activeText="$t('on')" :disableText="$t('off')" v-model="energyEnable" />
          </Row>
        </CardRow>
      </template>
      <CardRow>
        <Row>
          <RowText :text="$t('priceForKw')"/>
          <Input v-model="kWPriceControl"></Input>
          <RowText :text="currentCurrency.title"/>
          <!-- <MiniSwitcherUI v-if="!isAdvancedMode" :activeText="$t('on')" :disableText="$t('off')" v-model="energyEnable" /> -->
        </Row>
      </CardRow>
      <CardRow v-if="isAdvancedMode">
        <Row>
          <RowText :text="$t('workHours')"/>
          <InputSimple v-model="hoursControl"></InputSimple>
          <RowText :text="$t('hours')"/>
        </Row>
      </CardRow>
      <CardRow v-if="isHashrateMode && !isAdvancedMode">
        <Row>
          <RowText :text="$t('summaryEnergyComsumption')"/>
          <Input v-model="summaryEnergyConsumptionControl"></Input>
          <RowText text="kWh"/>
        </Row>
      </CardRow>
    </template>
    <template #footer v-if="isAdvancedMode">
      <CardRow>
        <Row>
          <RowText :text="$t('sum')"/>
          <Output promoted :value="isHashrateMode ? getEnergySumHashrate() : getEnergySum()"></Output>
          <RowText :text="currentCurrency.title"/>
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

import store, { currencyModule, Modes } from '../../../store/main';
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
import InputSimple from '../../Elements/InputSimple.vue';

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
    InputSimple,
    Output,
    MiniSwitcherUI
  }
})
export default class ElectroEnergy extends mixins(ModeMixin) {
  get currentCurrency() {
    return currencyModule.current
  }

  get hoursControl() {
    return String(parametersModule.energy.workHours)
  }
  set hoursControl(value: string) {
    if(Number(value) > 24) value = "24"
    parametersModule.updateParameter({ key: 'energy.workHours', value: value })
  }

  get gpuPowerConsumptionControl() {
    const hasActual = parametersModule.register.some(token => token === 'energy.gpuPowerConsumption')

    if(hasActual) {
      return String(parametersModule.getParameter("energy.gpuPowerConsumption"))
    }
    else {
      if(cryptoModule.current) {
        const devicesSummaryConsumption = calcModule.devicesPowerConsumptionAdvancedGPU(cryptoModule.current)
        return (devicesSummaryConsumption / 1000).toFixed(5)
      }
      else return "0"
    }
  }
  set gpuPowerConsumptionControl(value: string) {
    parametersModule.updateParameter({ key: 'energy.gpuPowerConsumption', value: value })
  }

  get powerConsumptionControl() {
    return String(parametersModule.getParameter('energy.powerConsumption'))
  }
  set powerConsumptionControl(value: string) {
    parametersModule.updateParameter({ key: 'energy.powerConsumption', value: value })
    
  }

  get kWPriceControl() {
    return String(parametersModule.getParameter("energy.kWPrice", true))
  }
  set kWPriceControl(value: string) {
    parametersModule.updateParameter({ key: 'energy.kWPrice', value: value, isRate: true })
  }

  get summaryEnergyConsumptionControl() {
    return String(parametersModule.energy.summaryPowerConsumption)
  }
  set summaryEnergyConsumptionControl(value: string) {
    parametersModule.updateParameter({ key: 'energy.summaryPowerConsumption', value: value })
  }

  getEnergySum() {
    const current = cryptoModule.current
    const hasActual = parametersModule.register.some(token => token === 'energy.gpuPowerConsumption')

    if(hasActual) {
      return calcModule.energyConsumptionSumAdvancedGPU().toFixed(2)
    }
    
    if(current) {
      return calcModule.energyConsumptionSumAdvancedGPU(current).toFixed(2)
    }
    else return "0.00"
  }

  getEnergySumHashrate() {
    return calcModule.energyConsumptionAdvancedHashrate().toFixed(2)
  }

  get energyEnable() {
    return parametersModule.energy.isEnable
  }
  set energyEnable(value: boolean) {
    parametersModule.updateEnergyIsEnable(value)
  }
}
</script>