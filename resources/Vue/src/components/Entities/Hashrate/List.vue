<template>
  <UIList :list="current ? [current] : []" limited>
    <template #item="{ item }">
      <InteractableItem big @plus="changeHandler('plus', { id: item.id })" @input="changeHandler('input', { id: item.id, value: $event }) " @minus="changeHandler('minus', { id: item.id })" :item="transform(item)">
        <template #addon>
          {{ item.type === 'pull' ? 'S/h' : 'Mh/S' }}
        </template>
      </InteractableItem>
    </template>
    <template v-slot:append>
      <UIListItem limited v-if="addMode">
        <HashrateSelect class="list__select" @reset="addMode = false"/>
      </UIListItem>
      <UIListItem limited v-if="isSelectable && !addMode">
        <button class="list__button" @click="addMode = true">
          <div class="list__button-plus">+</div>
          <span class="list__button-text">{{ $t('addAlgorithm') }}</span>
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
import { ISelectedCryptoItem } from '../../../store/modules/Crypto';
import HashrateSelect from './Select.vue';
import { Hashrate } from '../../../store/modules/Hashrate';

const hashrateModule = getModule(Hashrate, store)

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
    return hashrateModule.list
  }

  get current() {
    return hashrateModule.current
  }

  get isSelectable() {
    return !hashrateModule.current
  }

  @Prop({ type: Boolean }) interactable!: boolean

  changeHandler(type: 'plus' | 'minus', { id, value = 0 }: { id: string, value: any }) {
    hashrateModule.updateItemCount({ type, id, value })
  }

  transform(item: ISelectedCryptoItem) {
    return {
      ...item,
      name: item.algorithm
    }
  }
}
</script>