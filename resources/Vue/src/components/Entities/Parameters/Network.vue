<template>
  <div>
    <UITabs :tabs="tabs" :active="networkMode" @change="changeHandler($event)" />
    <Card>
      <template #body>
        <CardRow>
          <Row>
            <RowText :text="$t('initialDifficultyLevel')"/>
            <Input :disabled="!networkEnable" big v-model="initialDifficultyLevelControl"></Input>
            <RowText text="mH/S"/>
            <!-- <MiniSwitcherUI :activeText="$t('on')" :disableText="$t('off')" v-model="networkEnable" /> -->
          </Row>
        </CardRow>
        <CardRow>
          <Row>
            <RowText :text="$t('difficultyGrowth')"/>
            <Input percentage :disabled="!networkEnable" v-model="growthInComplexityControl"></Input>
            <RowText text="%"/>
            <UIHint :text="$t('networkComplexityGrowthPercentageTooltip').replace('/$unit/', getNetworkGrowthTimeTitle())" />
          </Row>
        </CardRow>
        <CardRow>
          <Row>
            <RowText :text="$t('networkGrowthTime')"/>
            <InputSimple :disabled="!networkEnable" v-if="isDay" v-model="networkGwothTimeControlDay"></InputSimple>
            <InputSimple :disabled="!networkEnable" v-if="isWeek" v-model="networkGwothTimeControlWeek"></InputSimple>
            <InputSimple :disabled="!networkEnable" v-if="isMonth" v-model="networkGwothTimeControlMonth"></InputSimple>
            <RowText :text="getNetworkGrowthTimeTitle()"/>
            <UIHint :text="$t('networkComplexityGrowthTimeTooltip').replace('/$unit/', getNetworkGrowthTimeTitle())" />
          </Row>
        </CardRow>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import { mixins } from 'vue-class-component';

import store, { Modes } from '../../../store/main';
import { NetworkModes, Parameters } from '../../../store/modules/Parameters';
import { Crypto } from '../../../store/modules/Crypto';

import Card from '../../Elements/Card.vue';
import CardRow from '../../Elements/Card/Row.vue';
import Row from '../../Elements/Row.vue';
import RowText from '../../Elements/Row/Text.vue';
import Input from '../../Elements/Input.vue';
import Output from '../../Elements/Output.vue';
import ModeMixin from '../../mixins/mode';
import UITabs from '../../UI/Tabs.vue';
import MiniSwitcherUI from '../../UI/MiniButton.vue';
import UIHint from '../../UI/Hint.vue';
import InputSimple from '../../Elements/InputSimple.vue';

const parametersModule = getModule(Parameters, store)
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
    UITabs,
    MiniSwitcherUI,
    UIHint
  }
})
export default class Network extends mixins(ModeMixin) {
  get tabs(){
    return [
      {
        id: NetworkModes.DAY,
        text: this.$t('dayU')
      },
      {
        id: NetworkModes.WEEK,
        text: this.$t('weekU')
      },
      {
        id: NetworkModes.MONTH,
        text: this.$t('monthU')
      }
    ]
  }

  get networkModes() {
    return NetworkModes
  }

  get networkMode() {
    return parametersModule.network.mode
  }

  get isDay() {
    return parametersModule.network.mode === NetworkModes.DAY
  }

  get isWeek() {
    return parametersModule.network.mode === NetworkModes.WEEK
  }

  get isMonth() {
    return parametersModule.network.mode === NetworkModes.MONTH
  }

  changeHandler(value: NetworkModes) {
      parametersModule.updateNetworkMode(value)
  }

  getNetworkGrowthTimeTitle() {
    if(this.isDay) return this.$t('days')
    if(this.isWeek) return this.$t('week2')
    if(this.isMonth) return this.$t('month')
  }

  get initialDifficultyLevelControl() {
    const hasActual = parametersModule.register.some(token => token === 'network.difficultyLevel')
    if(hasActual) {
      return String(parametersModule.getParameter("network.difficultyLevel"))
    }
    else return String(cryptoModule.current?.difficulty || 0)
  }

  set initialDifficultyLevelControl(value: string) {
    parametersModule.updateParameter({ key: 'network.difficultyLevel', value })
  }

  get growthInComplexityControl() {
    return String(parametersModule.getParameter("network.growthInComplexity"))
  }

  set growthInComplexityControl(value: string) {
    parametersModule.updateParameter({ key: 'network.growthInComplexity', value })
  }

  get networkGwothTimeControlDay() {
    return String(parametersModule.getParameter("network.networkGwothTimeDay"))
  }

  set networkGwothTimeControlDay(value: string) {
    value = String(Math.floor(Number(value)))

    parametersModule.updateParameter({ key: 'network.networkGwothTimeDay', value })
  }

  get networkGwothTimeControlWeek() {
    return String(parametersModule.getParameter("network.networkGwothTimeWeek"))
  }

  set networkGwothTimeControlWeek(value: string) {
    value = String(Math.floor(Number(value)))
    
    parametersModule.updateParameter({ key: 'network.networkGwothTimeWeek', value })
  }

  get networkGwothTimeControlMonth() {
    return String(parametersModule.getParameter("network.networkGwothTimeMonth"))
  }

  set networkGwothTimeControlMonth(value: string) {
    value = String(Math.floor(Number(value)))
    
    parametersModule.updateParameter({ key: 'network.networkGwothTimeMonth', value })
  }

  get networkEnable() {
    return parametersModule.network.isEnable
  }

  set networkEnable(value: boolean) {
    parametersModule.updateNetworkIsEnable(value)
  }
}
</script>