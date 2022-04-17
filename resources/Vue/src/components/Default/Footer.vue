<template>
  <footer class="footer page__footer">
    <div class="footer__inner container">
      <div class="footer__content">
        <div class="footer__row">
          <div class="footer__col footer__col--end">
            <div class="footer__block">
              <div class="footer__text">Limited Liability Company «Kriptek»</div>
              <div class="footer__text footer__text--row">ОГРН 1227700049851 <span>ИНН 9715413468</span></div>
            </div>
          </div>
          <div class="footer__logo footer__logo--mobile">
            <img class="logo footer__logo-img" :src="require('../../../../img/logo3.svg')"/>
          </div>
          <div class="footer__col">
            <div class="footer__block">
              <div class="footer__text">{{ $t('contactUs') }}: </div>
              <div class="footer__text footer__text--row">Telegram: @Kriptek <span>Mail: info@kriptek.net</span></div>
            </div>
          </div>
        </div>
        <div class="footer__logo footer__logo--desktop">
          <img class="logo footer__logo-img" :src="require('../../../../img/logo3.svg')"/>
        </div>
        <div class="footer__text footer__text--bottom" v-html="$t('rights')"></div>
        <a href="https://minerstat.com" target="_blank" class="footer__text footer__text--bottom">minerstat.com</a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>