<template>
  <footer class="footer page__footer">
    <div class="footer__inner container">
      <div class="footer__content">
        <div class="footer__row">
          <div class="footer__col footer__col--end">
            <div class="footer__block">
              <div class="footer__text">Limited Liability Company «Kriptek»</div>
              <div class="footer__text">ОГРН 1227700049851 <span>ИНН 9715413468</span></div>
            </div>
          </div>
          <div class="footer__col">
            <div class="footer__block">
              <div class="footer__text">Связаться с нами: </div>
              <div class="footer__text">Telegram: @Kriptek <span>Mail: kriptek_net@gmail.com</span></div>
            </div>
          </div>
        </div>
        <div class="footer__logo">
          <div class="logo footer__logo-img"></div>
        </div>
        <div class="footer__text">
          ©Copyright 2022 ООО «Криптек», 2022. All Rights Reserved<br>
          Общество с ограниченной ответственностью «Криптек»
        </div>
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