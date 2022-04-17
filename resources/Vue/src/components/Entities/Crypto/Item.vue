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
                {{ $t('gain') }}
                <br>
                <strong>{{ $t('_24h') }}</strong>
                <br>
                ({{ $t('crypto') }})
              </RowText>
              <Output big promoted :value="isHashrateMode ? gain24hAdvancedHashrate(item) : gain24hAdvancedGPU(item)"></Output>
              <RowText text="ETH" />
            </Row>
          </div>
          <div class="crypto-item__col">
            <Row>
              <RowText inner center>
                {{ $t('gain') }}
                <br>
                <strong>{{ $t('_24h') }}</strong>
                <br>
                ({{ $t('fiat') }})
              </RowText>
              <Output big promoted :value="isHashrateMode ? gain24hFiatAdvancedHashrate(item) : gain24hFiatAdvancedGPU(item)"></Output>
              <RowText text="USD" />
            </Row>
          </div>
          <div class="crypto-item__col">
            <Row>
              <RowText inner center>
                {{ $t('gain') }}
                <br>
                <strong>{{ $t('month') }}</strong>
                <br>
                ({{ $t('crypto') }})
              </RowText>
              <Output big promoted :value="isHashrateMode ? gainMonthAdvancedHashrate(item) : gainMonthAdvancedGPU(item)"></Output>
              <RowText text="ETH" />
            </Row>
          </div>
          <div class="crypto-item__col">
            <Row>
              <RowText inner center>
                {{ $t('gain') }}
                <br>
                <strong>{{ $t('month') }}</strong>
                <br>
                ({{ $t('fiat') }})
              </RowText>
              <Output big promoted :value="isHashrateMode ? gainMonthFiatAdvancedHashrate(item) : gainMonthFiatAdvancedGPU(item)"></Output>
              <RowText text="USD" />
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
            <span class="crypto-item__title crypto-item__title--additional">{{ item.reward_unit }}</span>
          </div>
          <div class="crypto-item__col">
            <Col>
              <ColText inner center small>
                {{ $t('gain') }} {{ $t('_24h') }}
                <br>
                ({{ $t('crypto') }})
              </ColText>
              <Output big promoted :value="isHashrateMode ? gain24hHashrate(item) : gain24hGPU(item) + ` ${item.reward_unit}`"></Output>
            </Col>
          </div>
          <div class="crypto-item__col">
            <Col>
              <ColText inner center small>
                {{ $t('gain') }} {{ $t('_24h') }}
                <br>
                ({{ $t('fiat') }})
              </ColText>
              <Output big promoted :value="isHashrateMode ? gain24hFiatHashrate(item) : gain24hFiatGPU(item) + ' USD'"></Output>
            </Col>
          </div>
        </div>
        <div class="crypto-item__footer">
          <Box :title="$t('gain')" addText="USD" :cols="3" row>
            <BoxItem>
              <Col>
                <ColText :text="$t('dayU')"/>
                <Output promoted big :value="isHashrateMode ? gainDayFiatHashrate(item) : gainDayFiatGPU(item)"></Output>
              </Col>
            </BoxItem>
            <BoxItem>
              <Col>
                <ColText :text="$t('weekU')"/>
                <Output promoted big :value="isHashrateMode ? gainWeekFiatHashrate(item) : gainWeekFiatGPU(item)"></Output></Col>
            </BoxItem>
            <BoxItem>
              <Col>
                <ColText :text="$t('monthU')"/>
                <Output promoted big :value="isHashrateMode ? gainMonthFiatHashrate(item) : gainMonthFiatGPU(item)"></Output>
              </Col>
            </BoxItem>
          </Box>
          <!-- <span class="crypto-item__text">
            Прибыль
          </span> -->
          <!-- <div class="crypto-item__col">
            <Col>
              <ColText inner center>
                В день
              </ColText>
              <Output big promoted :value="0 + ' USD'"></Output>
            </Col>
          </div>
          <div class="crypto-item__col">
            <Col>
              <ColText inner center>
                В неделю
              </ColText>
              <Output big promoted :value="0 + ' USD'"></Output>
            </Col>
          </div>
          <div class="crypto-item__col">
            <Col>
              <ColText inner center>
                В месяц
              </ColText>
              <Output big promoted :value="0 + ' USD'"></Output>
            </Col>
          </div> -->

        </div>
      </template>
    </div>  
  </div>
</template>

<script lang="ts">
import { Prop, Component } from 'vue-property-decorator'

import { ICryptoItem, ISelectedCryptoItem } from '../../../store/modules/Crypto'
import Row from '../../Elements/Row.vue';
import RowText from '../../Elements/Row/Text.vue';
import Output from '../../Elements/Output.vue';
import { mixins } from 'vue-class-component';
import ModeMixin from '../../mixins/mode';
import Col from '../../Elements/Col.vue';
import ColText from '../../Elements/Col/Text.vue';
import { getModule } from 'vuex-module-decorators';
import store from '../../../store/main';
import Box from '../../Elements/Box.vue';
import BoxItem from '../../Elements/Box/Item.vue';
import { Calculate } from '../../../store/modules/Calculate';

const calcModule = getModule(Calculate, store)

@Component({
  components: {
    Row,
    RowText,
    Col,
    ColText,
    CryptoItem,
    Output,
    Box,
    BoxItem
  }
})
export default class CryptoItem extends mixins(ModeMixin) {
  @Prop({ type: Object }) item!: ICryptoItem

  gain24hGPU(coin: ICryptoItem) {
    return (calcModule.gain24hGPU(coin)).toFixed(6)
  }

  gain24hFiatGPU(coin: ICryptoItem) {
    return (calcModule.gain24hFiatGPU(coin)).toFixed(2)
  }

  gainDayFiatGPU(coin: ICryptoItem) {
    return (calcModule.gainDayGPU(coin)).toFixed(2)
  }

  gainWeekFiatGPU(coin: ICryptoItem) {
    return (calcModule.gainWeekGPU(coin)).toFixed(2)
  }

  gainMonthFiatGPU(coin: ICryptoItem) {
    return (calcModule.gainMonthGPU(coin)).toFixed(2)
  }

  gain24hHashrate(coin: ISelectedCryptoItem) {
    return (calcModule.gain24hHashrate(coin)).toFixed(6)
  }

  gain24hFiatHashrate(coin: ISelectedCryptoItem) {
    return (calcModule.gain24hFiatHashrate(coin)).toFixed(2)
  }

  gainDayFiatHashrate(coin: ISelectedCryptoItem) {
    return (calcModule.gainDayHashrate(coin)).toFixed(2)
  }

  gainWeekFiatHashrate(coin: ISelectedCryptoItem) {
    return (calcModule.gainWeekHashrate(coin)).toFixed(2)
  }

  gainMonthFiatHashrate(coin: ISelectedCryptoItem) {
    return (calcModule.gainMonthHashrate(coin)).toFixed(2)
  }

  gain24hAdvancedGPU(coin: ISelectedCryptoItem) {
    return (calcModule.gain24hAdvancedGPU(coin).toFixed(6))
  }

  gain24hFiatAdvancedGPU(coin: ISelectedCryptoItem) {
    return (calcModule.gain24hFiatAdvancedGPU(coin).toFixed(2))
  }

  gainMonthAdvancedGPU(coin: ISelectedCryptoItem) {
    return (calcModule.gainMonthAdvancedGPU(coin).toFixed(6))
  }

  gainMonthFiatAdvancedGPU(coin: ISelectedCryptoItem) {
    return (calcModule.gainMonthFiatAdvancedGPU(coin).toFixed(2))
  }

  gain24hAdvancedHashrate(coin: ISelectedCryptoItem) {
    return (calcModule.gain24hAdvancedHashrate(coin).toFixed(6))
  }

  gain24hFiatAdvancedHashrate(coin: ISelectedCryptoItem) {
    return (calcModule.gain24hFiatAdvancedHashrate(coin).toFixed(2))
  }

  gainMonthAdvancedHashrate(coin: ISelectedCryptoItem) {
    return (calcModule.gainMonthAdvancedHashrate(coin).toFixed(6))
  }

  gainMonthFiatAdvancedHashrate(coin: ISelectedCryptoItem) {
    return (calcModule.gainMonthFiatAdvancedHashrate(coin).toFixed(2))
  }
}
</script>