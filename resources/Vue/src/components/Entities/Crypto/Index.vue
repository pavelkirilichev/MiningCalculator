<template>
  <UIList :list="list">
    <template #item="{ item }">
      <CryptoItem :item="item" />
    </template>
  </UIList>
</template>

<script lang="ts">
import Vue from 'vue'

import { Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import UIList from '../../UI/List.vue';
import CryptoItem from './Item.vue'

import { Crypto } from '../../../store/modules/Crypto';
import store from '../../../store/main';
import Card from '../../Elements/Card.vue';

const cryptoModule = getModule(Crypto, store)

@Component({
  components: {
    UIList,
    CryptoItem,
    Card
  }
})
export default class CryptoVue extends Vue {
  get list() {
    return cryptoModule.list
  }
}
</script>