<template>
  <UISelect :list="filteredList" limited @filter="filterHandler" @select="selectHandler($event.id)" placeholder="Введите ASIC или видеокарту">
    <template #item="{ item }">
      <Item :item="item"></Item>
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

import Item from './Item.vue'

const gpuModule = getModule(GPU, store)

@Component({
  components: {
    UISelect,
    Item
  }
})
export default class GPUSelect extends Vue {
  get filteredList() {
    return gpuModule.filteredList
  }
  selectHandler(id: number) {
    gpuModule.addSelected(id)
    gpuModule.updateFilter('')
    this.$emit('reset')
  }
  filterHandler(value: string) {
    gpuModule.updateFilter(value)
  }
}
</script>