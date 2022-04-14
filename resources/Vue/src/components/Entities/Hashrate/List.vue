<template>
  <UIList :list="list" limited>
    <template #item="{ item }">
      <InteractableItem @plus="changeHandler('plus', $event)" @minus="changeHandler('minus', $event)" :item="transform(item)"></InteractableItem>
    </template>
    <template v-slot:append>
      <UIListItem limited v-if="addMode">
        <HashrateSelect class="list__select" @reset="addMode = false"/>
      </UIListItem>
      <UIListItem limited v-if="isSelectable">
        <button class="list__button" @click="addMode = true">
          <div class="list__button-plus">+</div>
          <span class="list__button-text">Добавить устройство</span>
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

import Item from '../../UI/Item.vue'
import InteractableItem from '../../UI/InteractableItem.vue'
import UIList from '../../UI/List.vue';
import UIListItem from '../../UI/List/Item.vue';
import { Crypto, ICryptoItem } from '../../../store/modules/Crypto';
import HashrateSelect from './Select.vue';

const gpuModule = getModule(Crypto, store)

@Component({
  components: {
    InteractableItem,
    Item,
    UIList,
    UIListItem,
    HashrateSelect
  }
})
export default class HashrateList extends Vue {
  addMode = false

  get list() {
    return gpuModule.selected
  }

  get isSelectable() {
    return gpuModule.listToSelect.length
  }

  @Prop({ type: Boolean }) interactable!: boolean

  changeHandler(type: 'plus' | 'minus', id: string) {
    gpuModule.updateItemCount({ type, id })
  }

  transform(item: ICryptoItem) {
    return {
      ...item,
      name: item.algorithm
    }
  }
}
</script>