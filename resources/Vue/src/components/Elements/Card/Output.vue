<template>
  <span class="app-card-row__output" :class="{ 'app-card-row__output--promoted': promoted }">{{ value }}</span>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class CardOutput extends Vue {
  @Prop({ type: Boolean, default: false }) promoted!: boolean
  @Prop({ type: [Number, String] }) value!: any
}
</script>