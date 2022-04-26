<template>
  <UIList :list="list" limited>
    <template #item="{ item }">
      <InteractableItem @plus="changeHandler('plus', { id: item.id })" @minus="changeHandler('minus', { id: item.id })" @input="changeHandler('input', { id: item.id, value: $event })" :item="item"></InteractableItem>
    </template>
    <template v-slot:append>
      <UIListItem limited v-if="addMode">
        <GPUSelect class="list__select" @reset="addMode = false"/>
      </UIListItem>
      <UIListItem limited v-if="isSelectable">
        <button class="list__button" @click="addMode = true">
          <div class="list__button-plus">+</div>
          <span class="list__button-text">{{ $t('addDevice') }}</span>
        </button>
      </UIListItem>
      <UIListItem limited v-if="list.length === 0 && !addMode">
        <Item :class="['item--ghost']" :item="{ hashrate_measurement: 'Тут будет ваше оборудование', name: 'Тут будет ваше оборудование', id: -1 }"></Item>
      </UIListItem>
    </template>
  </UIList>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators';

import store from '../../../store/main';
import { GPU } from '../../../store/modules/GPU';

import InteractableItem from '../../UI/InteractableItem.vue'
import Item from '../../UI/Item.vue'
import GPUSelect from './Select.vue'
import UIList from '../../UI/List.vue';
import UIListItem from '../../UI/List/Item.vue';

const gpuModule = getModule(GPU, store)

@Component({
  components: {
    InteractableItem,
    Item,
    UIList,
    UIListItem,
    GPUSelect
  }
})
export default class GPUList extends Vue {
  addMode = false

  get list() {
    return gpuModule.selected
  }

  get isSelectable() {
    return gpuModule.listToSelect.length || gpuModule.list.length === 0
  }

  @Prop({ type: Boolean }) interactable!: boolean

  changeHandler(type: 'plus' | 'minus' | 'input', { id, value = 0 }: { id: string, value: any }) {
    gpuModule.updateItemCount({ type, id, value })
  }
}
</script>