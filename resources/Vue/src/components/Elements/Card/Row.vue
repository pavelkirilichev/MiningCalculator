<template>
  <div class="app-card__row app-card-row">
    <div class="app-card-row__inner">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component
export default class CardRow extends Vue {}
</script>