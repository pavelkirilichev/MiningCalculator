<template>
  <div class="list">
    <div class="list__inner" ref="wrap">
      <ul class="list__list">
        <slot name="prepend"></slot>
        <UIListItem @click="$emit('click:item', item)" v-for="item in list" :key="item.link" :limited="limited">
          <slot name="item" :item="item"></slot>
        </UIListItem>
        <slot name="append"></slot>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

import UIListItem from './List/Item.vue'

@Component({
  components: {
    UIListItem
  }
})
export default class UIList extends Vue {
  $refs!: {
    wrap: HTMLUListElement
  }
  
  @Prop({ type: Array }) list!: Array<any>
  @Prop({ type: Boolean }) limited!: boolean
  @Prop({ type: Boolean }) scrollable!: boolean

  mounted() {
    const wrap = this.$refs.wrap

    if(wrap && this.scrollable) {
      const item = wrap.querySelector(".list__item")

      if(item) {
        const height = item.scrollHeight
        const margin = parseFloat(window.getComputedStyle(item).marginTop)
        wrap.style.cssText = `max-height: ${(height * 3) + (margin * 3)}px;`
      }
    }
  }
}
</script>