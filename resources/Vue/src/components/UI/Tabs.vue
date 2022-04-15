<template>
  <div class="tabs">
    <div class="tabs__inner">
      <ul class="tabs__list">
        <div v-for="tab in tabs" :key="tab.id" @click="changeHandler(tab.id)" class="tab" :class="{ 'tab--active': tab.id === active }">
          <div class="tab__inner">
            <div class="tab__text">{{ tab.text }}</div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class UITabs extends Vue {
  active = 1
  @Prop({ type: Array }) tabs!: Array<{ id: number, text: string }>

  changeHandler(id: number) {
    this.active = id

    this.$emit('change', id)
  }
}
</script>