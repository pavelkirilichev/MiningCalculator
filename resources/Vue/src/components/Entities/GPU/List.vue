<template>
  <div class="list">
    <div class="list__inner">
      <ul class="list__list">
        <li class="list__item" v-for="item in list" :key="item.id">
          <InteractableItem @plus="changeHandler('plus', $event)" @minus="changeHandler('minus', $event)" :item="item"></InteractableItem>
        </li>
        <li class="list__item" v-if="addMode">
          <GPUSelect class="list__select" @reset="addMode = false"/>
        </li>
        <li class="list__item" v-if="isSelectable">
          <button class="list__button" @click="addMode = true">
            <div class="list__button-plus">+</div>
            <span class="list__button-text">Добавить устройство</span>
          </button>
        </li>
        <li class="list__item" v-if="list.length === 0">
          <Item :class="['item--ghost']" :item="{ algorithm: 'Тут будет ваше оборудование', name: 'Тут будет ваше оборудование', id: -1 }"></Item>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators';

import store from '../../../store/main';
import { GPU } from '../../../store/modules/GPU';

import InteractableItem from './InteractableItem.vue'
import Item from './Item.vue'
import GPUSelect from './Select.vue'

const gpuModule = getModule(GPU, store)

@Component({
  components: {
    InteractableItem,
    Item,
    GPUSelect
  }
})
export default class GPUList extends Vue {
  addMode = false

  get list() {
    return gpuModule.selected
  }

  get isSelectable() {
    return gpuModule.listToSelect.length
  }

  @Prop({ type: Boolean }) interactable!: boolean

  changeHandler(type: 'plus' | 'minus', id: number) {
    gpuModule.updateItemCount({ type, id })
  }
}
</script>