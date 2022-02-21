<template>
  <div class="info">
    <div class="info__inner container">
      <div class="info__tabs">
        <div class="info-tab info__tab" v-for="tab in tabs" :key="tab.id"></div>
      </div>
      <div class="info__blocks">
        <div class="info__block info-block" v-for="block in blocks" :key="block.id">
          <span class="info-block__title info-block__text">{{ block.title }}</span>
          <span class="info-block__price info-block__text">{{ block.currency.symbol }}{{ block.price.toFixed(2) }} {{ block.currency.name }}</span>
          <span class="info-block__text" v-if="block.text">{{ block.text }}</span>
          <span class="info-block__count info-block__text" v-if="block.unit">{{ block.count }}x{{ block.currency.symbol }}{{ block.price.toFixed(2) }} {{ block.unit.title }}s <span>({{ block.unit.additional }})</span></span>
          <ul class="info-block__list" v-if="block.additional">
            <li class="info-block__item" v-for="add in block.additional" :key="add">{{ add }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component
export default class AddInfo extends Vue {
  tabs = [
    {
      id: 0,
      title: 'Amazon'
    },
    {
      id: 1,
      title: 'Aliexpress'
    }
  ]

  blocks = [
    {
      title: 'Затраты на хранение',
      price: 103,
      currency: {
        symbol: '$',
        name: 'usd'
      },
      count: 1,
      unit: {
        title: 'HDD',
        additional: 'примерная цена за один диск'
      },
      additional: [
        'WD 3TB Elements Desktop Hard Drive HDD, USB 3.0, Compatible with PC, Mac, PS4 & Xbox - WDBWLG0030HBK-NESN'
      ]
    },
    {
      title: 'Затраты на хранение',
      price: 103,
      currency: {
        symbol: '$',
        name: 'usd'
      },
      count: 1,
      unit: {
        title: 'HDD',
        additional: 'примерная цена за один диск'
      },
      additional: [
        'WD 3TB Elements Desktop Hard Drive HDD, USB 3.0, Compatible with PC, Mac, PS4 & Xbox - WDBWLG0030HBK-NESN'
      ]
    },
    {
      title: 'Суммарные затраты',
      price: 206,
      currency: {
        symbol: '$',
        name: 'usd'
      },
      count: 1,
      text: 'Фактическая цена может отличаться в зависимости от страны и времени покупки.',
    }
  ]
}

</script>