<template>
  <input type="text" class="app-card-row__input" :value="value" @input="$emit('input', $event.target.value)"/>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class CardInput extends Vue {
  @Prop({ type: [Number, String] }) value!: any
}
</script>