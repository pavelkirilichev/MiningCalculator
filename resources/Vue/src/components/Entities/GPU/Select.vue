<template>
  <UISelect scrollable :list="filteredList" limited @filter="filterHandler" @select="selectHandler($event.id)" :placeholder="$t('printGpuAsic')">
    <template #item="{ item }">
      <Item :item="item" interactable></Item>
    </template>
  </UISelect>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import store from '../../../store/main';
import { GPU } from '../../../store/modules/GPU';
import UISelect from '../../UI/Select.vue';

import Item from '../../UI/Item.vue'

const gpuModule = getModule(GPU, store)

@Component({
  components: {
    UISelect,
    Item
  }
})
export default class GPUSelect extends Vue {
  get filteredList() {
    return gpuModule.listToSelect
  }
  selectHandler(id: string) {
    gpuModule.addSelected(id)
    gpuModule.updateFilter('')
    this.$emit('reset')
  }
  filterHandler(value: string) {
    gpuModule.updateFilter(value)
  }
}
</script>