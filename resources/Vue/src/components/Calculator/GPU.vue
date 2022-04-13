<template>
  <GPUList />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

import GPUList from '../Entities/GPU/List.vue'

@Component({
  components: {
    GPUList,
  }
})
export default class GPUVue extends Vue {}
</script>