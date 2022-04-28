<template>
  <div class="hint" :id="id + 'container'" :class="{ 'hint--active': active }">
    <!-- <div class="hint__badge">?</div> -->
    <!-- <div class="hint__content">{{ text }}</div> -->
    <div v-if="!mobile" v-b-tooltip:top.right.hover="text" class="hint__badge">?</div>
    <div v-if="mobile" v-b-tooltip:top.right.hover="text" class="hint__badge">?</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class UIHint extends Vue {
  @Prop({ type: String }) text!: string

  active = false
  id = `id_${Math.floor(Math.random() * 100000)}`
  mobile = false

  mounted() {
    if(!window.matchMedia("(min-width: 991px)").matches) {
      this.mobile = true
    }
  }
}
</script>