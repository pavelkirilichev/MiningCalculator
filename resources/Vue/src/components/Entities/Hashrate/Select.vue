<template>
  <UISelect scrollable :list="filteredList" limited @filter="filterHandler" @select="selectHandler($event.id)" :placeholder="$t('chooseAlgorithm')">
    <template #item="{ item }">
      <Item :item="transform(item)" interactable>
        <template #addon>
          Mh/S
        </template>
      </Item>
    </template>
  </UISelect>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import store from '../../../store/main';
import UISelect from '../../UI/Select.vue';

import Item from '../../UI/Item.vue'
import { Crypto, ICryptoItem } from '../../../store/modules/Crypto';
import { Hashrate } from '../../../store/modules/Hashrate';

const hashrateModule = getModule(Hashrate, store)

@Component({
  components: {
    UISelect,
    Item
  }
})
export default class HashrateSelect extends Vue {
  get filteredList() {
    return hashrateModule.list
  }
  selectHandler(id: string) {
    hashrateModule.updateCurrent(id)
    hashrateModule.updateFilter('')
    this.$emit('reset')
  }
  filterHandler(value: string) {
    hashrateModule.updateFilter(value)
  }

  transform(item: ICryptoItem) {
    return {
      ...item,
      name: item.algorithm
    }
  }
}
</script>