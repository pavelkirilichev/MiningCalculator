<template>
  <div class="box" :class="{ 'box--row': row, 'box__inner--static': staticHeight }">
    <div class="box__inner">
      <span class="box__title">
        {{ title }}
        <strong v-if="addText"> ({{ addText }})</strong>
      </span>
      <div class="box__body" :class="{ [`box__body--cols--${cols}`]: cols }">
        <slot name="default"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Box extends Vue {
  @Prop({ type: String }) title!: string
  @Prop({ type: String }) addText!: string

  @Prop({ type: Number }) cols!: number
  @Prop({ type: Boolean }) row!: boolean
  @Prop({ type: Boolean }) staticHeight!: boolean
}
</script>