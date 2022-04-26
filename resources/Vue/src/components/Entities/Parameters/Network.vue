<template>
  <div>
    <UITabs :tabs="tabs" @change="changeHandler($event)" />
    <Card>
      <template #body>
        <CardRow>
          <Row>
            <RowText :text="$t('initialDifficultyLevel')"/>
            <Input :disabled="!networkEnable" big v-model="initialDifficultyLevelControl"></Input>
            <RowText text="mH/S"/>
            <MiniSwitcherUI :activeText="$t('on')" :disableText="$t('off')" v-model="networkEnable" />
          </Row>
        </CardRow>
        <CardRow>
          <Row>
            <RowText :text="$t('difficultyGrowth')"/>
            <Input percentage :disabled="!networkEnable" v-model="growthInComplexityControl"></Input>
            <RowText text="%"/>
          </Row>
        </CardRow>
        <CardRow>
          <Row>
            <RowText :text="$t('networkGrowthTime')"/>
            <Input :disabled="!networkEnable" v-if="activeTab === 1" v-model="networkGwothTimeControlDay"></Input>
            <Input :disabled="!networkEnable" v-if="activeTab === 2" v-model="networkGwothTimeControlWeek"></Input>
            <Input :disabled="!networkEnable" v-if="activeTab === 3" v-model="networkGwothTimeControlMonth"></Input>
            <RowText :text="getNetworkGrowthTimeTitle()"/>
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
import { Parameters } from '../../../store/modules/Parameters';
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

const parametersModule = getModule(Parameters, store)
const cryptoModule = getModule(Crypto, store)

@Component({
  components: {
    Card,
    CardRow,
    Row,
    RowText,
    Input,
    Output,
    UITabs,
    MiniSwitcherUI
  }
})
export default class Network extends mixins(ModeMixin) {
  activeTab = 1

  get tabs(){
    return [
      {
        id: 1,
        text: this.$t('dayU')
      },
      {
        id: 2,
        text: this.$t('weekU')
      },
      {
        id: 3,
        text: this.$t('monthU')
      }
    ]
  }

  changeHandler(id: number) {
    this.activeTab = id
  }

  getNetworkGrowthTimeTitle() {
    if(this.activeTab === 1) return this.$t('days')
    if(this.activeTab === 2) return this.$t('week')
    if(this.activeTab === 3) return this.$t('month')
  }

  get initialDifficultyLevelControl() {
    const hasActual = parametersModule.register.some(token => token === 'network.difficultyLevel')
    if(hasActual) {
      return String(parametersModule.network.difficultyLevel)
    }
    else return String(cryptoModule.current?.difficulty || 0)
  }

  set initialDifficultyLevelControl(value: string) {
    parametersModule.updateParameter({ key: 'network.difficultyLevel', value })
  }

  get growthInComplexityControl() {
    return String(parametersModule.network.growthInComplexity)
  }

  set growthInComplexityControl(value: string) {
    parametersModule.updateParameter({ key: 'network.growthInComplexity', value })
  }

  get networkGwothTimeControlDay() {
    return String(parametersModule.network.networkGwothTimeDay)
  }

  set networkGwothTimeControlDay(value: string) {
    value = String(Math.floor(Number(value)))

    parametersModule.updateParameter({ key: 'network.networkGwothTimeDay', value })
  }

  get networkGwothTimeControlWeek() {
    return String(parametersModule.network.networkGwothTimeWeek)
  }

  set networkGwothTimeControlWeek(value: string) {
    value = String(Math.floor(Number(value)))
    
    parametersModule.updateParameter({ key: 'network.networkGwothTimeWeek', value })
  }

  get networkGwothTimeControlMonth() {
    return String(parametersModule.network.networkGwothTimeMonth)
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