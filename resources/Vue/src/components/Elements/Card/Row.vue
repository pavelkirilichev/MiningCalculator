<template>
  <div class="app-card-row app-card__row">
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component
export default class CardRow extends Vue {}
</script>