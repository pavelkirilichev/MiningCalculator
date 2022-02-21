<template>
  <div class="info">
    <div class="info__inner">
      <div class="info__tabs"></div>
      <div class="info__blocks">
        <div class="info__block" v-for="block in []" :key="block.id"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component
export default class AddInfo extends Vue {}

</script>