<template>
  <div class="block" :class="{ 'block--center': $attrs.center !== undefined, 'block--full': $attrs.full !== undefined, 'block--spec': $attrs.spec !== undefined }">
    <div class="block__head">
      <template v-if="icon">
        <div class="block__icon-wrap">
          <img :src="require(`../../../../img/${icon}.png`)" class="block__icon" />
        </div>
      </template>
      <span class="block__title" :class="{ 'block__title--spacing': hint }">{{ title }}</span>
      <template v-if="hint">
        <UIHint class="block__hint" />
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
import UIHint from '../UI/Hint.vue'

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
  },
  components: {
    UIHint
  }
})
export default class Block extends Vue {}
</script>