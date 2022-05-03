<template>
  <input v-bind="$attrs" type="text" class="app-input" :class="{ 'app-input--big': big }" :title="value" :value="value" @input="inputHandler"/>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class InputSimple extends Vue {
  @Prop({ type: [Number, String] }) value!: any
  @Prop({ type: Boolean }) big!: boolean
  @Prop({ type: Boolean }) percentage!: boolean

  inputHandler(field: any) {
    const input = field.target as HTMLInputElement
    input.value = input.value.replace(/\D+/g, '')

    if(this.percentage) {
      if(Number(input.value) > 100) {
        input.value = "100"
      }
    }

    this.$emit('input', input.value)
    // console.log('is Complete');
  }
}
</script>