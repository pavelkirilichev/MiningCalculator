<template>
  <div class="dropdown" :class="{ 'dropdown--active': opened }">
    <button class="dropdown__button" @click="toggle">
      <Icon :icon="require('../../../../img/svg/chevron-down.svg')" class="svg-icon dropdown__button-icon" />
      <span class="dropdown__button-text">{{ text }}</span>
    </button>
    <div class="dropdown__menu">
      <UIListVue :list="list">
        <template v-slot:default="{ item }">
          <RouterLink :to="{ path: item.link }" />
        </template>
      </UIListVue>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { Component, Prop } from 'vue-property-decorator';
import UIListVue from './List.vue'
//@ts-ignore
// import ChevronDownSvg from '../../../../img/svg/chevron-down.svg'
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

  toggle() {
    this.opened = !this.opened
  }
}
</script>