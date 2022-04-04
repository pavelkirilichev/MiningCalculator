<template>
  <div class="item">
    <div class="item__inner">
      <span class="item__text">{{ getTitle(item) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex';
import { Component, Prop } from 'vue-property-decorator';

import { DataMode, Modes } from '../../../store/main';
import { IGPUItem } from '../../../store/modules/GPU';

@Component({
  computed: {
    ...mapGetters(['mode', 'dataMode'])
  }
})
export default class GPUItem extends Vue {
  @Prop({ type: Object }) item!: any

  mode!: Modes
  dataMode!: DataMode

  getTitle(item: IGPUItem) {
    return this.dataMode === DataMode.HASH_MODE ? item.algorithm : item.name
  }
}
</script>