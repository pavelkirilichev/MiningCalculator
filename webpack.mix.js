const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.override(config => {
  config.module.rules.push({
    test: /\.vue$/,
    use: [{
      loader: "vue-svg-inline-loader",
      options: { /* ... */ }
    }]
  })
});

mix
  .js('resources/js/app.js', 'public/build/js')
  .ts('resources/Vue/main.ts', 'public/build/js/vue.js')
  .sass('resources/sass/app.scss', 'public/build/css')
  .copy('resources/img/**', 'public/build/img')
  .version()
