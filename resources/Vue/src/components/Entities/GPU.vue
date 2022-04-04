<template>
  <GPUList />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

import GPUList from './GPU/List.vue'

@Component({
  components: {
    GPUList,
  }
})
export default class GPUVue extends Vue {}
</script>