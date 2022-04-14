<template>
  <div class="item item--interactable">
    <div class="item__inner">
      <span class="item__text">{{ item.name }}</span>
      <div class="item__counter">
        <Counter :count="item.count" @plus="$emit('plus', item.id)" @minus="$emit('minus', item.id)"></Counter>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

import Counter from './Counter.vue'

@Component({
  components: {
    Counter
  }
})
export default class UIInteractableItem extends Vue {
  @Prop({ type: Object }) item!: { name: string, id: string }
}
</script>