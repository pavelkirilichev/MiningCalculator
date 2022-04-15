<template>
  <UIToggler @change="changeHandler" :text="$t('base')" :textActive="$t('advanced')" :value="calcMode"/>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import UIToggler from '../UI/Toggler.vue'

import { Modes } from '../../store/main'
import { mapGetters } from 'vuex';

@Component({
  components: {
    UIToggler
  },
  computed: {
    ...mapGetters(['mode'])
  }
})
export default class DataToggler extends Vue {
  mode!: Modes;

  get calcMode() {
    return !!this.mode
  }

  changeHandler() {
    this.$store.commit('setMode', this.mode === Modes.BASE_MODE ? Modes.ADVANCED_MODE : Modes.BASE_MODE)
  }
}
</script>