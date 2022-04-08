<template>
  <div class="list">
    <div class="list__inner" ref="wrap">
      <ul class="list__list">
        <li class="list__item" :class="{ 'list__item--limited': limited }" v-for="item in list" :key="item.link">
          <ListItem @click="$emit('click:item', item)">
            <slot name="item" :item="item"></slot>
          </ListItem>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

import ListItem from './List/Item.vue'

@Component({
  components: {
    ListItem
  }
})
export default class UIList extends Vue {
  $refs!: {
    wrap: HTMLUListElement
  }
  
  @Prop({ type: Array }) list!: Array<any>
  @Prop({ type: Boolean }) limited!: boolean

  mounted() {
    const wrap = this.$refs.wrap

    console.log(wrap.scrollHeight)

    if(wrap) {
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