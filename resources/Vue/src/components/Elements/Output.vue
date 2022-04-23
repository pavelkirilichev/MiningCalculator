<template>
  <div :class="{ 'app-output--promoted': promoted, 'app-output--big': big }" :title="value" class="app-output">
    <span class="app-output__text">
      {{ value }}
    </span>
  </div>
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