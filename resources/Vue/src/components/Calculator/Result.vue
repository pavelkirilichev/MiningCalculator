<template>
  <Boxes>
    <Box title="Выбранная криптовалюта"></Box>
    <Box title="Прибыль" addText="USD" :cols="3">
      <BoxItem>
        <Col>
          <ColText text="День"/>
          <Output promoted big></Output>
        </Col>
      </BoxItem>
      <BoxItem>
        <Col>
          <ColText text="Неделя"/>
          <Output promoted big></Output></Col>
      </BoxItem>
      <BoxItem>
        <Col>
          <ColText text="Месяц"/>
          <Output promoted big></Output>
        </Col>
      </BoxItem>
    </Box>
    <Box title="Срок укупаемости фермы" :cols="2">
      <BoxItem>
        <Row>
          <Output promoted big></Output>
          <RowText text="месяц"/>
        </Row>
      </BoxItem>
      <BoxItem>
        <Row>
          <Output promoted big></Output>
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

@Component({
  components: {
    Box,
    BoxItem,
    Boxes,
    Col,
    Row,
    Output,
    ColText,
    RowText
  }
})
export default class Result extends Vue {}
</script>