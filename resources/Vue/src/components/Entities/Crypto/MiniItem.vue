<template>
  <div class="crypto-mini-item">
    <div class="crypto-mini-item__inner">
      <div class="crypto-mini-item__img-wrap">
        <img :src="getImg(item)" alt="" class="crypto-mini-item__img">
      </div>
      <span class="crypto-mini-item__title">
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { ICryptoItem } from '../../../store/modules/Crypto';

@Component
export default class CryptoMiniItem extends Vue {
  @Prop({ type: Object }) item!: ICryptoItem

  getImg(item: ICryptoItem) {
    return `/uploads/crypto/${item.coin.toLowerCase()}.png?v=964`
  }
}
</script>