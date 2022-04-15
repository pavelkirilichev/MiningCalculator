<template>
  <div class="select">
    <div class="select__inner">
      <div class="select__filter">
        <input class="select__input" :placeholder="placeholder" type="text" @input="$emit('filter', $event.target.value)">
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
}
</script>