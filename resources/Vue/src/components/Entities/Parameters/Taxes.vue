<template>
  <Card>
    <template #body>
      <CardRow>
        <Row>
          <RowText :text="$t('currentTax')"/>
          <Input percentage :disabled="!taxesEnable" v-model="currentTaxControl"></Input>
          <RowText text="%"/>
          <!-- <MiniSwitcherUI :activeText="$t('on')" :disableText="$t('off')" v-model="taxesEnable" /> -->
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
    MiniSwitcherUI
  }
})
export default class Taxes extends mixins(ModeMixin) {
  get currentTaxControl() {
    return String(parametersModule.getParameter("taxes.current"))
  }

  set currentTaxControl(value: string) {
    parametersModule.updateParameter({ key: 'taxes.current', value })
  }

  get taxesEnable() {
    return parametersModule.taxes.isEnable
  }

  set taxesEnable(value: boolean) {
    parametersModule.updateTaxIsEnable(value)
  }
}
</script>