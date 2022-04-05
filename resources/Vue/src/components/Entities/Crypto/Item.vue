<template>
  <div class="crypto-item">
    <div class="crypto-item__inner">
      <div class="crypto-item__col crypto-item__col--inline">
        <div class="crypto-item__img-wrap">
          <img class="crypto-item__img" :src="item.img" :alt="item.title">
        </div>
      </div>
      <div class="crypto-item__col">
        <span class="crypto-item__text">{{ item.title }}</span>
        <span class="crypto-item__text crypto-item__text--additional">{{ item.unknown }}</span>
      </div>
      <div class="crypto-item__col">
        <Row>
          <RowText inner center>
            Выручка
            <br>
            <strong>24ч</strong>
            <br>
            (крипта)
          </RowText>
          <Output big promoted :value="item.gain.dayCrypto"></Output>
          <RowText text="ETH" />
        </Row>
      </div>
      <div class="crypto-item__col">
        <Row>
          <RowText inner center>
            Выручка
            <br>
            <strong>24ч</strong>
            <br>
            (фиат)
          </RowText>
          <Output big promoted :value="item.gain.dayFiat"></Output>
          <RowText text="USD" />
        </Row>
      </div>
      <div class="crypto-item__col">
        <Row>
          <RowText inner center>
            Выручка
            <br>
            <strong>месяц</strong>
            <br>
            (крипта)
          </RowText>
          <Output big promoted :value="item.gain.monthCrypto"></Output>
          <RowText text="ETH" />
        </Row>
      </div>
      <div class="crypto-item__col">
        <Row>
          <RowText inner center>
            Выручка
            <br>
            <strong>месяц</strong>
            <br>
            (фиат)
          </RowText>
          <Output big promoted :value="item.gain.monthFiat"></Output>
          <RowText text="ETH" />
        </Row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'

import { ICryptoItem } from '../../../store/modules/Crypto'
import Row from '../../Elements/Row.vue';
import RowText from '../../Elements/Row/Text.vue';
import Output from '../../Elements/Output.vue';

@Component({
  components: {
    Row,
    CryptoItem,
    RowText,
    Output
  }
})
export default class CryptoItem extends Vue {
  @Prop({ type: Object }) item!: ICryptoItem
}
</script>