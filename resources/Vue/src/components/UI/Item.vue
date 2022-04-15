e<template>
  <div class="item" :class="{ 'item--interactable': interactable }">
    <div class="item__inner">
      <span class="item__text">
        {{ item.name }}
        <span class="item__text-addon" v-if="$slots.addon">
          <slot name="addon"></slot>
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class UIItem extends Vue {
  @Prop({ type: Object }) item!: { name: string }
  @Prop({ type: Boolean }) interactable!: boolean
}
</script>