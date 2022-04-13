<template>
  <div class="app-col">
    <div class="app-col__inner">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component
export default class Col extends Vue {}
</script>