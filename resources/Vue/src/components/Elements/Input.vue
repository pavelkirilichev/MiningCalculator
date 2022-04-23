<template>
  <input type="text" class="app-input" :class="{ 'app-input--big': big }" :title="value" :value="value" @input="$emit('input', $event.target.value)"/>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Input extends Vue {
  @Prop({ type: [Number, String] }) value!: any
  @Prop({ type: Boolean }) big!: boolean
}
</script>