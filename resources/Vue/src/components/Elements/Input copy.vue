<template>
  <input v-bind="$attrs" v-mask="options" type="text" class="app-input" :class="{ 'app-input--big': big }" :title="value" :value="value" @input="inputHandler"/>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Input extends Vue {
  @Prop({ type: [Number, String] }) value!: any
  @Prop({ type: Boolean }) big!: boolean
  @Prop({ type: Boolean }) percentage!: boolean

  options = {
    alias: 'decimal',
    placeholder: "0",
    mask: '9{1,15},9{1,15}',
    radixPoint: ',',
    showMaskOnHover: false,
    substituteRadixPoint: true,
    allowMinus: false,
    clearMaskOnLostFocus: false,
    lazy: false,
  }

  inputHandler(field: any) {
    const input = field.target as HTMLInputElement & { inputmask: any }

    if(input.inputmask.isComplete() && input.inputmask.isValid()) {
      if(input.value.match(/[,.]$/)) return
     
      if(this.percentage) {
        if(Number(input.value) > 100) {
          input.value = "100"
        }
      }
      
      let value = input.value.replace(",", ".")

      this.$emit('input', value)
    }
  }
}
</script>