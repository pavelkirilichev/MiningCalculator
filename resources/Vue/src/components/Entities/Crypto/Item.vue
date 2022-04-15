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
              <Output big promoted :value="0"></Output>
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
              <Output big promoted :value="0"></Output>
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
              <Output big promoted :value="0"></Output>
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
              <Output big promoted :value="0"></Output>
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
            <span class="crypto-item__title crypto-item__title--additional">{{ item.reward_unit }}</span>
          </div>
          <div class="crypto-item__col">
            <Col>
              <ColText inner center small>
                {{ $t('gain') }} {{ $t('_24h') }}
                <br>
                ({{ $t('crypto') }})
              </ColText>
              <Output big promoted :value="isHashrateMode ? gain24hBaseHashrate(item) : gain24hBaseGPU(item) + ` ${item.reward_unit}`"></Output>
            </Col>
          </div>
          <div class="crypto-item__col">
            <Col>
              <ColText inner center small>
                {{ $t('gain') }} {{ $t('_24h') }}
                <br>
                ({{ $t('fiat') }})
              </ColText>
              <Output big promoted :value="isHashrateMode ? gain24hBaseHashrateFiat(item) : gain24hBaseGPUFiat(item) + ' USD'"></Output>
            </Col>
          </div>
        </div>
        <div class="crypto-item__footer">
          <Box :title="$t('gain')" addText="USD" :cols="3" row>
            <BoxItem>
              <Col>
                <ColText :text="$t('dayU')"/>
                <Output promoted big :value="isHashrateMode ? gainDayBaseHashrateFiat(item) : gainDayBaseGPUFiat(item)"></Output>
              </Col>
            </BoxItem>
            <BoxItem>
              <Col>
                <ColText :text="$t('weekU')"/>
                <Output promoted big :value="isHashrateMode ? gainWeekBaseHashrateFiat(item) : gainWeekBaseGPUFiat(item)"></Output></Col>
            </BoxItem>
            <BoxItem>
              <Col>
                <ColText :text="$t('monthU')"/>
                <Output promoted big :value="isHashrateMode ? gainMonthBaseHashrateFiat(item) : gainMonthBaseGPUFiat(item)"></Output>
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

  gain24hBaseGPU(coin: ICryptoItem) {
    return (calcModule.gainBaseGPU24h(coin)).toFixed(6)
  }

  gain24hBaseGPUFiat(coin: ICryptoItem) {
    return (calcModule.gainBaseGPU24hFiat(coin)).toFixed(2)
  }

  gainDayBaseGPUFiat(coin: ICryptoItem) {
    return (calcModule.gainBaseGPUDay(coin)).toFixed(2)
  }

  gainWeekBaseGPUFiat(coin: ICryptoItem) {
    return (calcModule.gainBaseGPUWeek(coin)).toFixed(2)
  }

  gainMonthBaseGPUFiat(coin: ICryptoItem) {
    return (calcModule.gainBaseGPUMonth(coin)).toFixed(2)
  }

  gain24hBaseHashrate(coin: ISelectedCryptoItem) {
    return (calcModule.gainBaseHashrate24h(coin)).toFixed(6)
  }

  gain24hBaseHashrateFiat(coin: ISelectedCryptoItem) {
    return (calcModule.gainBaseHashrate24hFiat(coin)).toFixed(2)
  }

  gainDayBaseHashrateFiat(coin: ISelectedCryptoItem) {
    return (calcModule.gainBaseHashrateDay(coin)).toFixed(2)
  }

  gainWeekBaseHashrateFiat(coin: ISelectedCryptoItem) {
    return (calcModule.gainBaseHashrateWeek(coin)).toFixed(2)
  }

  gainMonthBaseHashrateFiat(coin: ISelectedCryptoItem) {
    return (calcModule.gainBaseHashrateMonth(coin)).toFixed(2)
  }
}
</script>