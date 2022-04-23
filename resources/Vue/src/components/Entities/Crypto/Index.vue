<template>
  <UIList scrollable :list="list" @click:item="changeCryptoHandler" >
    <template #item="{ item }">
      <CryptoItem :item="item" />
    </template>
  </UIList>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import UIList from '../../UI/List.vue';
import CryptoItem from './Item.vue'

import { Crypto, ICryptoItem } from '../../../store/modules/Crypto';
import store from '../../../store/main';
import Card from '../../Elements/Card.vue';
import { mixins } from 'vue-class-component';
import ModeMixin from '../../mixins/mode';

const cryptoModule = getModule(Crypto, store)

@Component({
  components: {
    UIList,
    CryptoItem,
    Card
  }
})
export default class CryptoVue extends mixins(ModeMixin) {
  get list() {
    if(this.isHashrateMode) {
      return cryptoModule.filteredByActive
    }
    else {
      return cryptoModule.filteredByDevices
    }
  }

  changeCryptoHandler(item: ICryptoItem) {
    cryptoModule.addSelected(item.id)
  }
}
</script>