<template>
  <span class="app-col__text">{{ text }}</span>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class ColText extends Vue {
  @Prop({ type: String }) text!: string
}
</script>