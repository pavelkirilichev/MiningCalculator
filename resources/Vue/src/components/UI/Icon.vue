<template>
  <img svg-inline class="icon" :src="icon" alt="example" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component({
  props: {
    icon: {
      type: String,
      default: ""
    }
  }
})
export default class Icon extends Vue {}

</script>