<template>
  <Card>
    <template #body>
      <CardRow>
        <Row>
          <RowText text="Действительная цена на криптовалюту"/>
          <Output :value="1.4"></Output>
          <RowText text="usd"/>
        </Row>
      </CardRow>
      <CardRow>
        <Row>
          <RowText text="Процент роста стоиомости (месяц/год)"/>
          <Output :value="6.5"></Output>
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

import Card from '../../Elements/Card.vue';
import CardRow from '../../Elements/Card/Row.vue';
import Row from '../../Elements/Row.vue';
import RowText from '../../Elements/Row/Text.vue';
import Input from '../../Elements/Input.vue';
import Output from '../../Elements/Output.vue';
import ModeMixin from '../../mixins/mode';

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
export default class CurrencyExchangeRate extends mixins(ModeMixin) {}
</script>