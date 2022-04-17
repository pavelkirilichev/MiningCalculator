<template>
  <div class="item">
    <div class="item__inner">
      <span class="item__text">
        {{ item.name }}
        <span class="item__text-addon" v-if="$slots.addon">
          <slot name="addon"></slot>
        </span>
      </span>
      <div class="item__counter">
        <Counter :big="big" :count="item.count" @plus="$emit('plus', item.id)" @input="$emit('input', $event)" @minus="$emit('minus', item.id)"></Counter>
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
  @Prop({ type: Boolean }) big!: boolean
}
</script>