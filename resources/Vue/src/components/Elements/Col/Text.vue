<template>
  <span class="app-col__text" :class="{ 'app-col__text--center': center, 'app-col__text--small': small }">
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
export default class ColText extends Vue {
  @Prop({ type: String }) text!: string
  @Prop({ type: Boolean, default: false }) center!: boolean
  @Prop({ type: Boolean, default: false }) inner!: boolean
  @Prop({ type: Boolean, default: false }) small!: boolean
}
</script>