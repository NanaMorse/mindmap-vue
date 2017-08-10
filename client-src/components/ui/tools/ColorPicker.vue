<template>
  <div>
    <div class="color-picker" tabindex="1"
         @click="onClick"
         @blur="onBlur">
      <div class="color-picker-swatch" :style="{ backgroundColor: currentColor.hex }"/>
      <div class="popover-panel-wrapper" :class="{ 'hide': !show }" >
        <color-picker-panel :value="currentColor" @input="onColorSelected"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'
  import { Sketch, Swatches } from 'vue-color'

  @Component({
    components: {
      'color-picker-panel': Swatches
    }
  })
  class ColorPicker extends Vue {

    @Prop() color: string;

    @Prop() onColorChanged: Function;

    /** @Data */
    show: boolean = false;

    /** @Computed */
    get currentColor() {
      return { hex: this.color };
    }

    /** @Listener */
    onClick() {
      this.show = true;
    }

    /** @Listener */
    onBlur() {
      this.show = false;
    }

    /** @Listener */
    onColorSelected(newColor: { hex: string }) {
      this.onColorChanged(newColor.hex);
    }
  }

  export default ColorPicker
</script>

<style scoped lang="scss">
  $swatchSize: 36px;

  .color-picker {
    position: relative;
    outline: none;

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
    }
  }
</style>