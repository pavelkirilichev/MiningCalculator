<template>
  <div class="list-item" @click="$emit('click')">
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';

@Component
export default class ListItem extends Vue {}
</script>