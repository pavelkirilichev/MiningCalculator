<template>
  <div class="app-row">
    <div class="app-row__inner">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component
export default class Row extends Vue {}
</script>