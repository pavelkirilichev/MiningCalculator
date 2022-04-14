<template>
  <HashrateList />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

import HashrateList from '../Entities/Hashrate/List.vue';

@Component({
  components: {
    HashrateList,
  }
})
export default class HashrateVue extends Vue {}
</script>