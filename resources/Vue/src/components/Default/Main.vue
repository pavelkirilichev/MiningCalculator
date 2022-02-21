<template>
  <main class="page__content">
    <slot name="default"></slot>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component
export default class Main extends Vue {}
</script>