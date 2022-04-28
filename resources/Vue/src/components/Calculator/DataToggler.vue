<template>
  <UITogglerAdvanced @change="changeHandler" :text="$t('gpuAsic')" textActive="Hashrate" :value="dataMode"/>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

import { cryptoModule, DataMode } from '../../store/main'
import { mapGetters } from 'vuex';
import UITogglerAdvanced from '../UI/TogglerAdvanced.vue';

@Component({
  components: {
    UITogglerAdvanced
  },
  computed: {
    ...mapGetters({
      mode: 'dataMode'
    })
  }
})
export default class DataToggler extends Vue {
  mode!: DataMode;

  get dataMode() {
    return !!this.mode
  }

  changeHandler() {
    this.$store.commit('setDataMode', this.mode === DataMode.BASE_MODE ? DataMode.HASH_MODE : DataMode.BASE_MODE)
    cryptoModule.switch()
  }
}
</script>