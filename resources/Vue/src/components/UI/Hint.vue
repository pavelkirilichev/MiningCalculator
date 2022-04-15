<template>
  <div class="hint">
    <div class="hint__badge">?</div>
    <div class="hint__content"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component
export default class UIHint extends Vue {}
</script>