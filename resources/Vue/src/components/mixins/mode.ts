import { Component } from 'vue-property-decorator'
import Vue from 'vue';
import { DataMode, Modes } from '../../store/main';

@Component
export default class ModeMixin extends Vue {
  get mode(): Modes {
    return this.$store.getters['mode']
  }
  get dataMode(): DataMode {
    return this.$store.getters['dataMode']
  }

  get isAdvancedMode() {
    return this.mode === Modes.ADVANCED_MODE
  }

  get isHashrateMode() {
    return this.dataMode === DataMode.HASH_MODE
  }
}