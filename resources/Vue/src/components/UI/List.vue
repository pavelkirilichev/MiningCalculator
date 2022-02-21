<template>
  <div class="list">
    <div class="list__inner">
      <ul class="list__list">
        <li class="list__item" v-for="item in list" :key="item.link">
          <ListItem @click="$emit('click:item')">
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
  @Prop({ type: Array }) list!: Array<any>
}
</script>