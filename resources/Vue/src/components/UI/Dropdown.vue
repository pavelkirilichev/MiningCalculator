<template>
  <div class="dropdown" :class="{ 'dropdown--active': opened }">
    <button class="dropdown__button" @click="toggle">
      <span class="dropdown__button-text">{{ text }}</span>
      <svg width="8" height="3" viewBox="0 0 8 3" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon dropdown__button-icon" >
        <path d="M4 3L0.535899 1.75695e-07L7.4641 -4.29987e-07L4 3Z" fill="black"/>
      </svg>
    </button>
    <div class="dropdown__menu">
      <div class="dropdown__menu-inner">
        <UIListVue :list="list" @click:item="changeHandler(item)">
          <template #item="{ item }">
            <a v-if="item.url" :href="item.url" class="dropdown__item">{{ item.title }}</a>
            <span v-else class="dropdown__item">{{ item.title }}</span>
          </template>
        </UIListVue>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { Component, Prop } from 'vue-property-decorator';
import UIListVue from './List.vue'
import Icon from './Icon.vue';

@Component({
  components: {
    UIListVue,
    Icon
  }
})
export default class UIDropdown extends Vue {
  opened = false

  @Prop({ type: Array }) list!: Array<any>
  @Prop({ type: String }) text!: string
  @Prop({ type: String }) value!: any

  toggle() {
    this.opened = !this.opened
  }

  changeHandler(item: any) {
    this.$emit('change', item)
    this.opened = false
  }
}
</script>