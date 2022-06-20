<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ mix('/build/css/app.css') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <!-- Yandex.RTB -->
    <script>window.yaContextCb=window.yaContextCb||[]</script>
    <script src="https://yandex.ru/ads/system/context.js" async></script>
    @php
      $locale = app()->getLocale()
    @endphp
    
    @if($locale === 'ru')
      <title>Майнинг калькулятор</title>
      <meta name="description" content="">
      <meta property="og:title" content="Майнинг калькулятор">
      <meta property="og:description" content="">
      <meta property="og:url" content="">
      <meta property="og:type" content="website">
    @elseif($locale === 'en')
      <title>Mining calculator</title>
      <meta name="description" content="">
      <meta property="og:title" content="Mining calculator">
      <meta property="og:description" content="">
      <meta property="og:url" content="">
      <meta property="og:type" content="website">
    @endif
  </head>
  <body>
    @yield('content')
  </body>
</html>