<template>
  <span class="app-output" :class="{ 'app-output--promoted': promoted, 'app-output--big': big }">{{ value }}</span>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Output extends Vue {
  @Prop({ type: Boolean, default: false }) promoted!: boolean
  @Prop({ type: Boolean, default: false }) big!: boolean
  @Prop({ type: [Number, String] }) value!: any
}
</script>