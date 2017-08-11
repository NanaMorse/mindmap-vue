<template>
  <div>
    <p class="panel-title">Stage Style</p>
    <div class="panel-row">
      <span>Background Color :</span>
      <color-picker :color="stageBackgroundColor"
                    :onColorChanged="setStageBackgroundColor"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import { State, Mutation } from 'vuex-class'
  import ColorPicker from 'client-src/components/ui/tools/ColorPicker.vue'
  import { stage } from 'client-src/constants/mutations'
  import { stageBackgroundColor } from 'client-src/constants/defaultstyle'
  import { stageInfo } from 'client-src/interface'

  @Component({
    components: {
      'color-picker': ColorPicker
    }
  })
  class StagePanel extends Vue {

    @State('stage') stage: stageInfo;

    @Mutation(stage.setBackgroundColor) _setStageBackgroundColor;

    /** @Computed */
    get stageBackgroundColor() {
      return this.stage.backgroundColor || stageBackgroundColor
    }

    /** @Helper */
    setStageBackgroundColor(color: string) {
      this._setStageBackgroundColor({ color });
    }

  }

  export default StagePanel
</script>

<style lang="scss" scoped>
  @import "panelStyle";
</style>