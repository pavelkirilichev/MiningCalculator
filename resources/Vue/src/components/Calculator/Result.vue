<template>
  <Boxes v-if="currentCryptoItem">
    <BoxesItem>
      <Box :title="$t('chosenCrypto')" staticHeight>
        <CryptoMiniItem v-if="currentCryptoItem" :item="currentCryptoItem"></CryptoMiniItem>
      </Box>
    </BoxesItem>
    <BoxesItem>
      <Box :title="$t('earnings')" :addText="currentCurrency.title" :cols="3" staticHeight>
        <BoxItem>
          <Col>
            <ColText :text="$t('dayU')"/>
            <Output promoted large :value="isHashrateMode ? earningDayAdvancedHashrate() : earningDayAdvancedGPU()"></Output>
          </Col>
        </BoxItem>
        <BoxItem>
          <Col>
            <ColText :text="$t('week2U')"/>
            <Output promoted large :value="isHashrateMode ? earningWeekAdvancedHashrate() : earningWeekAdvancedGPU()"></Output></Col>
        </BoxItem>
        <BoxItem>
          <Col>
            <ColText :text="$t('monthU')"/>
            <Output promoted large :value="isHashrateMode ? earningMonthAdvancedHashrate() : earningMonthAdvancedGPU()"></Output>
          </Col>
        </BoxItem>
      </Box>
    </BoxesItem>
    <BoxesItem>
      <Box :title="$t('farmPaybackPeriod')" :cols="2" staticHeight>
        <BoxItem>
          <Row>
            <Output promoted big :value="isHashrateMode ? farmPaybackPeriodHashrate().month : farmPaybackPeriodGPU().month"></Output>
            <RowText :text="$t('month')"/>
          </Row>
        </BoxItem>
        <BoxItem>
          <Row>
            <Output promoted big :value="isHashrateMode ? farmPaybackPeriodHashrate().day : farmPaybackPeriodGPU().day"></Output>
            <RowText :text="$t('days')"/>
          </Row>
        </BoxItem>
      </Box>
    </BoxesItem>
  </Boxes>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import Box from '../Elements/Box.vue';
import Boxes from '../Elements/Boxes.vue';
import Col from '../Elements/Col.vue';
import BoxItem from '../Elements/Box/Item.vue';
import Output from '../Elements/Output.vue';
import ColText from '../Elements/Col/Text.vue';
import RowText from '../Elements/Row/Text.vue';
import Row from '../Elements/Row.vue';
import { getModule } from 'vuex-module-decorators';
import { Crypto, ISelectedCryptoItem } from '../../store/modules/Crypto';
import store, { currencyModule } from '../../store/main';
import CryptoMiniItem from '../Entities/Crypto/MiniItem.vue';
import { Sum } from '../../store/modules/Sum';
import BoxesItem from '../Elements/Box/BoxesItem.vue';
import { Calculate } from '../../store/modules/Calculate';
import { mixins } from 'vue-class-component';
import ModeMixin from '../mixins/mode';

const cryptoModule = getModule(Crypto, store)
const sumModule = getModule(Sum, store)
const calcModule = getModule(Calculate, store)

@Component({
  components: {
    Box,
    BoxesItem,
    BoxItem,
    Boxes,
    Col,
    Row,
    Output,
    ColText,
    RowText,
    CryptoMiniItem
  }
})
export default class Result extends mixins(ModeMixin) {
  get currentCryptoItem() {
    return cryptoModule.current
  }

  get currentCurrency() {
    return currencyModule.current
  }
  
  get getSum() {
    return sumModule.getSum
  }

  
  farmPaybackPeriodGPU() {
    if(this.currentCryptoItem) {
      return calcModule.farmPaybackPeriodAdvancedGPU(this.currentCryptoItem)
    }

    return {
      month: 0,
      day: 0
    }
  }
  
  farmPaybackPeriodHashrate() {
    if(this.currentCryptoItem) {
      return calcModule.farmPaybackPeriodHashrate(this.currentCryptoItem)
    }

    return {
      month: 0,
      day: 0
    }
  }

  earningDayAdvancedGPU() {
    if(this.currentCryptoItem) {
      return calcModule.earningDayAdvancedGPU(this.currentCryptoItem).toFixed(2)
    }

    return 0
  }

  earningWeekAdvancedGPU() {
    if(this.currentCryptoItem) {
      return calcModule.earningWeekAdvancedGPU(this.currentCryptoItem).toFixed(2)
    }

    return 0
  }

  earningMonthAdvancedGPU() {
    if(this.currentCryptoItem) {
      return calcModule.earningMonthAdvancedGPU(this.currentCryptoItem).toFixed(2)
    }

    return 0
  }

  earningDayAdvancedHashrate() {
    if(this.currentCryptoItem) {
      return calcModule.earningDayAdvancedHashrate(this.currentCryptoItem).toFixed(2)
    }

    return 0
  }

  earningWeekAdvancedHashrate() {
    if(this.currentCryptoItem) {
      return calcModule.earningWeekAdvancedHashrate(this.currentCryptoItem).toFixed(2)
    }

    return 0
  }

  earningMonthAdvancedHashrate() {
    if(this.currentCryptoItem) {
      return calcModule.earningMonthAdvancedHashrate(this.currentCryptoItem).toFixed(2)
    }

    return 0
  }
}
</script>