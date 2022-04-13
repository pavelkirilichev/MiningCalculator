<template>
  <div class="crypto-item" :class="{ 'crypto-item--base': !isAdvancedMode }">
    <div class="crypto-item__inner">
      <template v-if="isAdvancedMode">
        <div class="crypto-item__body">
          <div class="crypto-item__col crypto-item__col--inline crypto-item__col--title">
            <div class="crypto-item__img-wrap">
              <img class="crypto-item__img" :src="item.img" :alt="item.name">
            </div>
            <span class="crypto-item__title">{{ item.name }}</span>
            <span class="crypto-item__title crypto-item__title--additional">{{ item.name_abb }}</span>
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
      </template>
      <template v-else>
        <div class="crypto-item__body">
          <div class="crypto-item__col crypto-item__col--inline crypto-item__col--title">
            <div class="crypto-item__img-wrap">
              <img class="crypto-item__img" :src="item.img" :alt="item.name">
            </div>
            <span class="crypto-item__title">{{ item.name }}</span>
            <span class="crypto-item__title crypto-item__title--additional">{{ item.name_abb }}</span>
          </div>
          <div class="crypto-item__col">
            <Col>
              <ColText inner center small>
                Выручка 24ч
                <br>
                (крипта)
              </ColText>
              <Output big promoted :value="item.gain.dayCrypto + ' ETH'"></Output>
            </Col>
          </div>
          <div class="crypto-item__col">
            <Col>
              <ColText inner center small>
                Выручка 24ч
                <br>
                (фиат)
              </ColText>
              <Output big promoted :value="item.gain.dayFiat + ' USD'"></Output>
            </Col>
          </div>
        </div>
        <div class="crypto-item__footer">
          <span class="crypto-item__text">
            Прибыль
          </span>
          <div class="crypto-item__col">
            <Col>
              <ColText inner center>
                В день
              </ColText>
              <Output big promoted :value="getSum.day + ' USD'"></Output>
            </Col>
          </div>
          <div class="crypto-item__col">
            <Col>
              <ColText inner center>
                В неделю
              </ColText>
              <Output big promoted :value="getSum.week + ' USD'"></Output>
            </Col>
          </div>
          <div class="crypto-item__col">
            <Col>
              <ColText inner center>
                В месяц
              </ColText>
              <Output big promoted :value="getSum.month + ' USD'"></Output>
            </Col>
          </div>
        </div>
      </template>
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
import { mixins } from 'vue-class-component';
import ModeMixin from '../../mixins/mode';
import Col from '../../Elements/Col.vue';
import ColText from '../../Elements/Col/Text.vue';
import { getModule } from 'vuex-module-decorators';
import { Sum } from '../../../store/modules/Sum';
import store from '../../../store/main';

const sumModule = getModule(Sum, store)

@Component({
  components: {
    Row,
    RowText,
    Col,
    ColText,
    CryptoItem,
    Output,
  }
})
export default class CryptoItem extends mixins(ModeMixin) {
  @Prop({ type: Object }) item!: ICryptoItem

  get getSum() {
    return sumModule.getSum
  }
}
</script>