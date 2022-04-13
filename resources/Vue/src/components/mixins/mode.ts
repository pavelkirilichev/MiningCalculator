import { Component } from 'vue-property-decorator'
import Vue from 'vue';
import { Modes } from '../../store/main';

@Component
export default class ModeMixin extends Vue {
  get mode() {
    return this.$store.getters['mode']
  }
  get isAdvancedMode() {
    return this.mode === Modes.ADVANCED_MODE
  }
}