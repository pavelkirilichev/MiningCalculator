<template>
  <div class="app-card">
    <div class="app-card__inner">
      <div class="app-card__body">
        <slot name="body"></slot>
      </div>
      <div class="app-card__footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Card extends Vue {}
</script>