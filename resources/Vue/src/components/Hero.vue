<template>
  <div class="hero">
    <div class="hero__inner container">
      <div class="hero__bg"></div>
      <div class="hero__content">
        <div class="hero__main-text" v-html="$t('heroTitle')"></div>

        <ul class="hero__list">
          <li class="hero__list-item" v-html="$t('heroList[0]')"></li>
          <li class="hero__list-item" v-html="$t('heroList[1]')"></li>
          <li class="hero__list-item" v-html="$t('heroList[2]')"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';

@Component
export default class Hero extends Vue {}
</script>