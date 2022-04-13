<template>
  <div class="blocks" :class="{ 'blocks--row':  isRow, 'blocks--center': $attrs.center !== undefined }">
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Blocks extends Vue {
  get isRow() {
    return this.$slots.default!.length > 1
  }
}
</script>