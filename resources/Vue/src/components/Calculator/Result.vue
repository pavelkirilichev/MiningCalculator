<template>
  <Boxes>
    <BoxesItem>
      <Box :title="$t('chosenCrypto')" staticHeight>
        <CryptoMiniItem v-if="currentCryptoItem" :item="currentCryptoItem"></CryptoMiniItem>
      </Box>
    </BoxesItem>
    <BoxesItem>
      <Box :title="$t('earnings')" addText="USD" :cols="3" staticHeight>
        <BoxItem>
          <Col>
            <ColText :text="$t('dayU')"/>
            <Output promoted big :value="getSum.day"></Output>
          </Col>
        </BoxItem>
        <BoxItem>
          <Col>
            <ColText :text="$t('weekU')"/>
            <Output promoted big :value="getSum.week"></Output></Col>
        </BoxItem>
        <BoxItem>
          <Col>
            <ColText :text="$t('monthU')"/>
            <Output promoted big :value="getSum.month"></Output>
          </Col>
        </BoxItem>
      </Box>
    </BoxesItem>
    <BoxesItem>
      <Box :title="$t('farmPaybackPeriod')" :cols="2" staticHeight>
        <BoxItem>
          <Row>
            <Output promoted big :value="0"></Output>
            <RowText :text="$t('month')"/>
          </Row>
        </BoxItem>
        <BoxItem>
          <Row>
            <Output promoted big :value="0"></Output>
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
import { Crypto } from '../../store/modules/Crypto';
import store from '../../store/main';
import CryptoMiniItem from '../Entities/Crypto/MiniItem.vue';
import { Sum } from '../../store/modules/Sum';
import BoxesItem from '../Elements/Box/BoxesItem.vue';

const cryptoModule = getModule(Crypto, store)
const sumModule = getModule(Sum, store)

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
export default class Result extends Vue {
  get currentCryptoItem() {
    return cryptoModule.current
  }
  
  get getSum() {
    return sumModule.getSum
  }
}
</script>