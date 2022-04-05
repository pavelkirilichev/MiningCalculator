<template>
  <div class="box__item">
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component
export default class BoxItem extends Vue {}
</script>