<template>
  <div class="boxes__item">
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component
export default class BoxesItem extends Vue {}
</script>