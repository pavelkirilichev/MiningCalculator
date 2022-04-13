<template>
  <Boxes>
    <Box title="Выбранная криптовалюта">
      <CryptoMiniItem :item="currentCryptoItem"></CryptoMiniItem>
    </Box>
    <Box title="Прибыль" addText="USD" :cols="3">
      <BoxItem>
        <Col>
          <ColText text="День"/>
          <Output promoted big :value="getSum.day"></Output>
        </Col>
      </BoxItem>
      <BoxItem>
        <Col>
          <ColText text="Неделя"/>
          <Output promoted big :value="getSum.week"></Output></Col>
      </BoxItem>
      <BoxItem>
        <Col>
          <ColText text="Месяц"/>
          <Output promoted big :value="getSum.month"></Output>
        </Col>
      </BoxItem>
    </Box>
    <Box title="Срок укупаемости фермы" :cols="2">
      <BoxItem>
        <Row>
          <Output promoted big :value="0"></Output>
          <RowText text="месяц"/>
        </Row>
      </BoxItem>
      <BoxItem>
        <Row>
          <Output promoted big :value="0"></Output>
          <RowText text="дней"/>
        </Row>
      </BoxItem>
    </Box>
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

const cryptoModule = getModule(Crypto, store)
const sumModule = getModule(Sum, store)

@Component({
  components: {
    Box,
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