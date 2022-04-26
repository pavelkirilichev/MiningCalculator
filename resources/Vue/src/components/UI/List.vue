<template>
  <div class="list">
    <div class="list__inner" ref="wrap" :class="{ 'list__inner--scrollable': scrollable }">
      <ul class="list__list">
        <slot name="prepend"></slot>
        <UIListItem @click="$emit('click:item', item)" v-for="item, index in list" :key="item.id" :limited="limited" :interactable="interactable">
          <slot name="item" :item="item" :index="index"></slot>
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
  @Prop({ type: Boolean }) interactable!: boolean

  calcHeight() {
    requestAnimationFrame(() => {
      const wrap = this.$refs.wrap

      if(wrap && this.scrollable) {
        const item = wrap.querySelector(".list__item:last-child")

        if(item) {
          const height = item.scrollHeight
          const margin = parseFloat(window.getComputedStyle(item).marginTop)
          wrap.style.cssText = `max-height: ${(height * 3) + (margin * 3)}px;`
        }
      }

      this.calcHeight()
    })
  }

  mounted() {
    this.calcHeight()
  }
}
</script>