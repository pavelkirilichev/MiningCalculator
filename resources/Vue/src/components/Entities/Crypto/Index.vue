<template>
  <UIList scrollable :list="list" @click:item="changeCryptoHandler" >
    <template #item="{ item, index }">
      <template v-if="index === 0">
        <CryptoItem :item="item" />
        <div class="crypto-item">
          <div class="crypto-item__inner">
            <img width="100%" src="https://sun9-7.userapi.com/s/v1/ig2/ydGYuHlXKxQTC3neuuO6c_NKlZiJZAI4rKkZqcTH8CUa3PTGy46YOaJrUWoO8K9lPWRUAi-_bNxqKNJ74g4R1SmT.jpg?size=799x279&quality=96&type=album" alt="">
          </div>
        </div>
      </template>
      <template v-else>
        <CryptoItem :item="item" />
      </template>
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
    return cryptoModule.list
  }

  changeCryptoHandler(item: ICryptoItem) {
    cryptoModule.updateCurrent(item.id)
  }
}
</script>