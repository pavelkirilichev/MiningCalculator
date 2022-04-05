<template>
  <div class="calculator">
    <div class="calculator__inner container">
      <span class="calculator__title">
        {{ $t('mainTitle') }}
      </span>
      <div class="calculator__togglers">
        <ModeToggler class="calculator__toggler"></ModeToggler>
        <DataToggler class="calculator__toggler"></DataToggler>
      </div>
      <div class="calculator__main">
        <Blocks>
          <Block full title="Выбор устройства" icon="lighting" :hint="{}">
            <GPUVue />
          </Block>
        </Blocks>
        <Blocks>
          <Block title="Электроэнергия" icon="lighting">
            <ElectroEnergy />
          </Block>
          <Block title="Стоимость фермы" icon="lighting">
            <Farm></Farm>
          </Block>
        </Blocks>
        <Blocks>
          <Block full center title="Выбор криптовалюты" icon="lighting">
            <Card></Card>
          </Block>
        </Blocks>
        <Blocks>
          <Block title="Коммиссии" icon="lighting">
            <Card></Card>
          </Block>
          <div class="blocks__col">
            <Block title="Курс обмена валют" icon="lighting">
              <Card></Card>
            </Block>
            <Block title="Налоги" icon="lighting">
              <Card></Card>
            </Block>
          </div>
        </Blocks>
        <Blocks center>
          <Block title="Сложность сети" center icon="lighting">
            <Card></Card>
          </Block>
        </Blocks>
        <Blocks center>
          <Block title="Результат" full center icon="lighting">
            <Result></Result>
          </Block>
        </Blocks>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import ModeToggler from './Calculator/ModeToggler.vue';
import DataToggler from './Calculator/DataToggler.vue';

import Blocks from './Elements/Blocks.vue'
import Block from './Elements/Block.vue'
import Card from './Elements/Card.vue'
import GPUVue from './Calculator/GPU.vue';
import ElectroEnergy from './Entities/Parameters/ElectroEnergy.vue';
import Farm from './Entities/Parameters/Farm.vue';
import Result from './Calculator/Result.vue';

@Component({
  components: {
    ModeToggler,
    DataToggler,
    Blocks,
    Block,
    Card,
    GPUVue,
    ///

    ElectroEnergy,
    Farm,
    Result,
  }
})
export default class Calculator extends Vue {}
</script>