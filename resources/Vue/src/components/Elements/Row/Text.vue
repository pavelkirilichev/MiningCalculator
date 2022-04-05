<template>
  <span class="app-row__text" :class="{ 'app-row__text--center': center }">
    <template v-if="inner">
      <slot name="default"></slot>
    </template>
    <template v-else>{{ text }}</template>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class RowText extends Vue {
  @Prop({ type: String }) text!: string
  @Prop({ type: Boolean, default: false }) center!: boolean
  @Prop({ type: Boolean, default: false }) inner!: boolean
}
</script>