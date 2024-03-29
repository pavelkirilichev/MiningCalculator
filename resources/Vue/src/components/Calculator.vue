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
          <Block full :title="isHashrateMode ? $t('chooseAlgorithm') : $t('chooseDevice')">
            <HashrateVue v-if="isHashrateMode" />
            <GPUVue v-else/>
          </Block>
        </Blocks>
        <Blocks>
          <Block :title="$t('electricity')" icon="flash_1">
            <ElectroEnergy />
          </Block>
          <Block v-if="isAdvancedMode" :title="$t('farmCost')" icon="price-tag_1" >
            <Farm></Farm>
          </Block>
          <Block v-else :title="$t('commissions')" icon="percentage_1" :hint="{ text: $t('generalCommissionTooltip').replace('/$currency/', currentCurrency.title) }">
            <Commision />
          </Block>
        </Blocks>
        <Blocks>
          <Block v-if="cryptoLength" full center :title="$t('chooseCrypto')">
            <CryptoVue />
          </Block>
        </Blocks>
        <Blocks>
          <Block v-if="isAdvancedMode" :title="$t('commissions')" spec icon="percentage_1" :hint="{ text: $t('transactionCommissionTooltip') }">
            <Commision />
          </Block>
          <div class="blocks__col">
            <Block v-if="isAdvancedMode" :title="$t('exchangeRate')" icon="currency-exchange_1">
              <CurrencyExchangeRate />
            </Block>
            <Block v-if="isAdvancedMode" :title="$t('taxes')" icon="bag_1">
              <Taxes />
            </Block>
          </div>
        </Blocks>
        <Blocks v-if="isAdvancedMode" center>
          <Block :title="$t('networkComplexity')" center icon="data-complexity_1" :hint="{ text: $t('networkComplexityTooltip') }">
            <Network />
          </Block>
        </Blocks>
        <!-- Yandex.RTB R-A-1693708-1 -->
        <div ref="vueScript" class="ads">
          <div id="yandex_rtb_R-A-1693708-2"></div>
          <component is="script" type="text/javascript" v-html="script"></component>
        </div>
        <Blocks v-if="isAdvancedMode && currentCrypto" center>
          <Block :title="$t('result')" full center >
            <Result></Result>
          </Block>
        </Blocks>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators';
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
import CryptoVue from './Entities/Crypto/Index.vue';
import { mixins } from 'vue-class-component';
import ModeMixin from './mixins/mode';
import HashrateVue from './Calculator/Hashrate.vue';
import Network from './Entities/Parameters/Network.vue';
import Taxes from './Entities/Parameters/Taxes.vue';
import CurrencyExchangeRate from './Entities/Parameters/CurrencyExchangeRate.vue';
import Commision from './Entities/Parameters/Commision.vue';

import { Crypto } from '../store/modules/Crypto'
import store, { currencyModule } from '../store/main';

const cryptoModule = getModule(Crypto, store)

@Component({
  components: {
    ModeToggler,
    DataToggler,
    Blocks,
    Block,
    Card,
    GPUVue,
    HashrateVue,
    CryptoVue,
    //

    ElectroEnergy,
    Farm,
    Result,
    Network,
    Taxes,
    CurrencyExchangeRate,
    Commision
    //
  }
})
export default class Calculator extends mixins(ModeMixin) {
  $refs!: {
    vueScript: HTMLDivElement
  }

  script = `window.yaContextCb.push(()=>{
        Ya.Context.AdvManager.render({
          renderTo: 'yandex_rtb_R-A-1693708-2',
          blockId: 'R-A-1693708-2'
        })
      })`.trim()

  get cryptoLength() {
    return cryptoModule.list.length || cryptoModule.current
  }

  get currentCrypto() {
    return cryptoModule.current
  }

  get currentCurrency() {
    return currencyModule.current
  }
}
</script>