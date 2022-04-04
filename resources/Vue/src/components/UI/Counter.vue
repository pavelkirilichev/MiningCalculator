<template>
  <div class="counter">
    <div class="counter__inner">
      <button class="counter__button counter__button--minus" @click="$emit('minus')">-</button>
      <span class="counter__text">{{ countControl }}</span>
      <button class="counter__button counter__button--plus" @click="$emit('plus')">+</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Counter extends Vue {
  @Prop({ type: [Number], required: true }) count!: number

  get countControl(): string {
    return String(this.count)
  }

  set countControl(value: string) {}
}
</script>