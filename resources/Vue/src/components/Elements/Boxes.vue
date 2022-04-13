<template>
  <div class="boxes">
    <div class="boxes__inner">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component
export default class Boxes extends Vue {}
</script>