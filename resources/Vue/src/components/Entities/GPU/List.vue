<template>
  <div class="list">
    <div class="list__inner">
      <ul class="list__list">
        <li class="list__item" v-for="item in list" :key="item.id">
          <InteractableItem @plus="changeHandler('plus', $event)" @minus="changeHandler('minus', $event)" :item="item"></InteractableItem>
        </li>
        <GPUSelect class="list__select" v-if="addMode" @reset="addMode = false"/>
        <button class="list__button" @click="addMode = true" v-if="isSelectable">
          <div class="list__button-plus">+</div>
          <span class="list__button-text">Добавить устройство</span>
        </button>
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
import GPUSelect from './Select.vue'

const gpuModule = getModule(GPU, store)

@Component({
  components: {
    InteractableItem,
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