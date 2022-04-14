e<template>
  <div class="item">
    <div class="item__inner">
      <span class="item__text">{{ item.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class UIItem extends Vue {
  @Prop({ type: Object }) item!: { name: string }
}
</script>