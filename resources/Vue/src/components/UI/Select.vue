<template>
  <VueSelect></VueSelect>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

import VueSelect from 'vue-select'

@Component({
  components: {
    VueSelect
  }
})
export default class UISelect extends Vue {}
</script>