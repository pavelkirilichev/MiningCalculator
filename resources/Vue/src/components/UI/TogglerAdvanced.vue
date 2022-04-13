<template>
  <label class="toggler-advanced" :class="{ 'toggler-advanced--active': value }">
    <div class="toggler-advanced__inner">
      <span class="toggler-advanced__text">{{ text }}</span>
      <div class="toggler-advanced__input-wrap">
        <input type="checkbox" v-model="togglerControl" class="toggler-advanced__input">
        <div class="toggler-advanced__replacer">
          <div class="toggler-advanced__replacer-inner"></div>
        </div>
      </div>
      <span class="toggler-advanced__text toggler-advanced__text--active">{{ textActive }}</span>
    </div>
  </label>
</template>

<script lang="ts">
import Vue from 'vue'

import { Component, Prop } from 'vue-property-decorator'

@Component({
  props: {
    text: {
      type: String
    },
    textActive: {
      type: String
    }
  }
})
export default class UITogglerAdvanced extends Vue {
  @Prop({ type: Boolean }) value!: boolean

  get togglerControl() {
    return this.value
  }
  set togglerControl(value: boolean) {
    this.$emit('change')
  }
}
</script>