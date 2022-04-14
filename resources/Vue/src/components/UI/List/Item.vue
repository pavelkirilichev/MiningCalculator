<template>
  <li class="list__item" :class="{ 'list__item--limited': limited }" @click="$emit('click')">
    <div class="list-item">
      <slot name="default"></slot>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class UIListItem extends Vue {
  @Prop({ type: Boolean, default: false }) limited!: boolean
}
</script>