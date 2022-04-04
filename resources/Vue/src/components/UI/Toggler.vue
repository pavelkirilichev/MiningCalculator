<template>
  <label class="toggler" :class="{ 'toggler--active': value }">
    <div class="toggler__inner">
      <div class="toggler__replacer"></div>
      <span class="toggler__text">{{ text }}</span>
      <span class="toggler__text toggler__text--active">{{ textActive }}</span>
      <input type="checkbox" value='0' v-model="togglerControl" class="toggler__input">
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
export default class UIToggler extends Vue {
  @Prop({ type: Boolean }) value!: boolean

  get togglerControl() {
    return this.value
  }
  set togglerControl(value: boolean) {
    this.$emit('change')
  }
}
</script>