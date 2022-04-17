<template>
  <div class="counter" :class="{ 'counter--big': big }">
    <div class="counter__inner">
      <button class="counter__button counter__button--minus" @click="$emit('minus')">-</button>
      <input class="counter__text" v-model="countControl" />
      <button class="counter__button counter__button--plus" @click="$emit('plus')">+</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Counter extends Vue {
  @Prop({ type: [Number, String], required: true }) count!: number
  @Prop({ type: Boolean }) big!: boolean

  get countControl(): string {
    return String(this.count)
  }

  set countControl(value: string) {
    this.$emit('input', value)
  }
}
</script>