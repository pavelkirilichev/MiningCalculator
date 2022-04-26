<template>
  <input v-bind="$attrs" type="text" class="app-input" :class="{ 'app-input--big': big }" :title="value" :value="value" @input="inputHandler"/>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Input extends Vue {
  @Prop({ type: [Number, String] }) value!: any
  @Prop({ type: Boolean }) big!: boolean
  @Prop({ type: Boolean }) percentage!: boolean

  inputHandler($event: Event & { target: HTMLInputElement }) {
    if(this.percentage) {
      if(Number($event.target.value) > 100) {
        $event.target.value = "100"
      }
    }

    if(isNaN(Number($event.target.value))) return 
    
    this.$emit('input', $event.target.value)
  }
}
</script>