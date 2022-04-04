<template>
  <div class="item item--interactable">
    <div class="item__inner">
      <span class="item__text">{{ getTitle(item) }}</span>
      <div class="item__counter">
        <Counter :count="item.count" @plus="$emit('plus', item.id)" @minus="$emit('minus', item.id)"></Counter>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DataMode, Modes } from '../../../store/main';
import { IGPUItem } from '../../../store/modules/GPU';
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import Counter from '../../UI/Counter.vue'

@Component({
  components: {
    Counter
  },
  computed: {
    ...mapGetters(['mode', 'dataMode'])
  }
})
export default class GPUItem extends Vue {
  mode!: Modes
  dataMode!: DataMode

  @Prop({ type: Object }) item!: IGPUItem

  getTitle(item: IGPUItem) {
    return this.dataMode === DataMode.HASH_MODE ? item.algorithm : item.name
  }
}
</script>