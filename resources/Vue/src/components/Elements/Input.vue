<template>
  <input
    ref="input"
    v-bind="{ ...$attrs }"
    v-imask="mask"
    type="text"
    class="app-input"
    :class="{ 'app-input--big': big }"
    :title="value"
    :value="value"
    @change="onChange($event.target.value)"
    @complete="onComplete($event.target.value)"
    @input="onAccept($event.target.value)"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

// @ts-ignore
import { IMaskComponent, IMaskDirective } from 'vue-imask';

import Mask from 'imask'

@Component({
  components: {
    InputMask: IMaskComponent,
  },
  directives: {
    imask: IMaskDirective
  }
})
export default class Input extends Vue {
  $refs!: {
    input: HTMLInputElement & { maskRef: Mask.InputMask<Mask.MaskedNumberOptions> }
  }

  @Prop({ type: [Number, String] }) value!: any;
  @Prop({ type: Boolean }) big!: boolean;
  @Prop({ type: Boolean }) percentage!: boolean;
  @Prop({ type: Boolean }) hasNegative!: boolean
  
  old = ''
  t: any

  get mask(): Mask.MaskedNumberOptions {
    return {
      mask: Number,  // enable number mask

      // other options are optional with defaults below
      signed: !this.hasNegative,  // disallow negative
      thousandsSeparator: '',  // any single char
      padFractionalZeros: false,  // if true, then pads zeros at end to the length of scale
      normalizeZeros: true,  // appends or removes zeros at ends
      radix: ',',  // fractional delimiter
      mapToRadix: ['.'],  // symbols to process as radix
      

      // additional number interval options (e.g.)
      min: this.hasNegative ? -Infinity : 0,
      max: this.percentage ? 100 : Infinity,
      scale: 10,
    }
  }

  onChange(value: number) {
    let val = `${value}`
    let str = val.replace(/\,/g, '.')

    if (this.percentage) {
      const num = Number(str)

      if (num > 99.99) {
        str = "100";
      }
      if (num < -99.99) {
        str = "-100";
      }
      
      this.$refs.input.value = str
    }

    if(str.match(/^(-?\d+|-?\d+\.\d+)$/)) {
      this.$emit("input", str);
    }
  }

  onComplete() {
    clearTimeout(this.t)

    this.t = setTimeout(() => {
      const event = new Event('change')
      this.$refs.input.dispatchEvent(event)
    }, 500)
  }

  onAccept(value: string) {
    let val = `${value}`
    let str = val.replace(/\,/g, '.')

    if(this.old === '') {
      this.$refs.input.value = "0"
    }

    if(Number(this.old) <= 0 && ["10", "20", "30", "40", "50", "60", "70", "80", "90", "00"].includes(str)) {
      str = String(Number(str) / 10)
      this.$refs.input.maskRef.value = str
      this.old = str
    }
  }

  created() {
    this.old = `${this.value}`
  }
}
</script>