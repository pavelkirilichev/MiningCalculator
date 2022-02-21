<template>
  <div class="hero">
    <div class="hero__inner container">
      <div class="hero__bg"></div>
      <div class="hero__content">
        <div class="hero__main-text"><strong>Kriptek</strong> - самый точный майнинг калькулятор</div>

        <ul class="hero__list">
          <li class="hero__list-item">— Учитывайте <strong>рост</strong> сложности сети</li>
          <li class="hero__list-item">— Изменяйте <strong>цену продажи</strong> валюты</li>
          <li class="hero__list-item">— Настраивайте <strong>дополнительные</strong> платежи</li>
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