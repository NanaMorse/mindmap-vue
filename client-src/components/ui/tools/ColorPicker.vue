<template>
  <div>
    <div class="color-picker" @click="onClick">
      <div class="color-picker-swatch" />
      <div class="popover-panel-wrapper" :class="{ 'hide': !showPopover }">
        <sketch-color-picker v-model="currentColor" ref="popup" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { Sketch } from 'vue-color'
  import PopupMixin from 'muse-ui/src/internal/popup'
  import PopupManager from 'muse-ui/src/internal/popup/manager.js'

  @Component({
    components: {
      'sketch-color-picker': Sketch
    },
    mixins: [PopupMixin]
  })
  class ColorPicker extends Vue implements PopupMixin {

    @Prop() color: string;

    /** @Data */
    open: boolean;

    /** @Computed */
    get showPopover() {
      return this.open;
    }

    /** @Computed */
    get currentColor() {
      return this.color || '#000';
    }

    /** @Listener */
    onClick() {
      this.open = true;
    }

    /** @Helper */
    overlayClick() {
      console.log('dede')
    }
  }

  export default ColorPicker
</script>

<style scoped lang="scss">
  $swatchSize: 36px;

  .color-picker {
    position: relative;

    .color-picker-swatch {
      width: $swatchSize;
      height: $swatchSize;
      border-radius: $swatchSize;
      cursor: pointer;
      box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    }

    .popover-panel-wrapper {
      position: absolute;
      right: 0;
      top: calc(#{$swatchSize} + 4px);
      z-index: 10000;

      &.hide {
        display: none;
      }

      .cover {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
  }
</style>