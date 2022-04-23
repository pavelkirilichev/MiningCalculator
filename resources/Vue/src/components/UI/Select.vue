<template>
  <div class="select">
    <div class="select__inner">
      <div class="select__filter">
        <input class="select__input" :disabled="disabled" :placeholder="placeholder" type="text" @input="filterHandle">
      </div>
      <UIList scrollable :list="list" @click:item="$emit('select', $event)" interactable>
        <template #item="{ item }">
          <slot name="item" :item="item"></slot>
        </template>
      </UIList>
      <!-- <ul class="select__list">
        <li class="select__item" v-for="item in list" :key="item.id" @click="$emit('select', item)">
          <slot name="item" :item="item"></slot>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import UIList from './List.vue';

@Component({
  components: {
    UIList
  }
})
export default class UISelect<T> extends Vue {
  @Prop({ type: Array }) list!: Array<T>
  @Prop({ type: String }) placeholder!: string
  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: Number }) time!: number

  filterHandle($event: Event & { target: HTMLInputElement }) {
    this.$emit('filter', $event.target.value)
  }
}
</script>