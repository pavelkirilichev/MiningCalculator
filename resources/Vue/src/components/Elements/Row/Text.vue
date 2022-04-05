<template>
  <span class="app-row__text">{{ text }}</span>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class RowText extends Vue {
  @Prop({ type: String }) text!: string
}
</script>