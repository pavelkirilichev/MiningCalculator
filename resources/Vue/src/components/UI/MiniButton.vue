<template>
  <button class="mini-switcher" @click="$emit('input', !value)" :class="{ 'mini-switcher--active': value }">
    <span class="mini-switcher__text">{{ value ? activeText : disableText }}</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class MiniSwitcherUI extends Vue {
  @Prop({ type: String }) activeText!: string
  @Prop({ type: String }) disableText!: string
  @Prop({ type: Boolean }) value!: boolean
}
</script>