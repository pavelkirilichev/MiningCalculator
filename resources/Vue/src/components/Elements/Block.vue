<template>
  <div class="block" :class="{ 'block--center': $attrs.center !== undefined, 'block--full': $attrs.full !== undefined }">
    <div class="block__head">
      <template v-if="icon">
        <div class="block__icon-wrap">
          <svg class="block__icon"></svg>
        </div>
      </template>
      <span class="block__title" :class="{ 'block__title--spacing': hint }">{{ title }}</span>
      <template v-if="hint">
        <div class="block__hint block-hint">
          <div class="block-hint__badge">?</div>
          <div class="block-hint__content"></div>
        </div>
      </template>
    </div>
    <div class="block__body">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { Component } from 'vue-property-decorator'

@Component({
  props: {
    title: {
      type: String
    },
    icon: {
      type: String
    },
    hint: {
      type: Object,
      default: () => null
    }
  }
})
export default class Block extends Vue {}
</script>