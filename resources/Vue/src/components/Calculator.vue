<template>
  <div class="calculator">
    <div class="calculator__inner container">
      <span class="calculator__title">
        Выбор калькулятора
      </span>
      <ModeToggler class="calculator__toggler"></ModeToggler>
      <DataToggler class="calculator__toggler"></DataToggler>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import ModeToggler from './Calculator/ModeToggler.vue';
import DataToggler from './Calculator/DataToggler.vue';

@Component({
  components: {
    ModeToggler,
    DataToggler
  }
})
export default class Calculator extends Vue {}
</script>