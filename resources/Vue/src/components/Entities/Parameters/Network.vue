<template>
  <div>
    <UITabs :tabs="tabs" @change="changeHandler($event)" />
    <Card>
      <template #body>
        <CardRow>
          <Row>
            <RowText :text="$t('initialDifficultyLevel')"/>
            <Input placeholder="1.4" big v-model="initialDifficultyLevelControl"></Input>
            <RowText text="a"/>
          </Row>
        </CardRow>
        <CardRow>
          <Row>
            <RowText :text="$t('difficultyGrowth')"/>
            <Input v-model="growthInComplexityControl"></Input>
            <RowText text="%"/>
          </Row>
        </CardRow>
        <CardRow>
          <Row>
            <RowText :text="$t('networkGrowthTime')"/>
            <Input v-if="activeTab === 1" v-model="networkGwothTimeControlDay"></Input>
            <Input v-if="activeTab === 2" v-model="networkGwothTimeControlWeek"></Input>
            <Input v-if="activeTab === 3" v-model="networkGwothTimeControlMonth"></Input>
            <RowText text="a"/>
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

import Card from '../../Elements/Card.vue';
import CardRow from '../../Elements/Card/Row.vue';
import Row from '../../Elements/Row.vue';
import RowText from '../../Elements/Row/Text.vue';
import Input from '../../Elements/Input.vue';
import Output from '../../Elements/Output.vue';
import ModeMixin from '../../mixins/mode';
import UITabs from '../../UI/Tabs.vue';

const parametersModule = getModule(Parameters, store)

@Component({
  components: {
    Card,
    CardRow,
    Row,
    RowText,
    Input,
    Output,
    UITabs
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

  get initialDifficultyLevelControl() {
    return String(parametersModule.network.difficultyLevel || '')
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
}
</script>