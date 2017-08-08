<template>
  <div class="side-panel" :style="panelStyle" :class="{ 'show': app.showSidePanel }">
    <div class="stage-panel">
      <p class="panel-title">Stage Style</p>
      <div class="panel-row">
        <span>Background Color:</span>
        <color-picker />
      </div>
    </div>
    <div class="topic-panel hide">

    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator'
  import { State, Mutation } from 'vuex-class'
  import ColorPicker from './tools/ColorPicker.vue'
  import { sidePanelWidth } from 'client-src/constants/defaultstyle'
  import { appInfo } from 'client-src/interface'

  @Component({
    components: {
      'color-picker': ColorPicker
    }
  })
  class SidePanel extends Vue {

    @State('app') app: appInfo;

    /** @Computed */
    get panelStyle() {
      return {
        width: `${sidePanelWidth}px`
      }
    }
  }

  export default SidePanel;
</script>

<style lang="scss" scoped>
  .side-panel {
    position: fixed;
    top: 64px;
    right: 0;
    bottom: 0;
    z-index: 1;
    box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
    color: rgba(0,0,0,.87);
    background-color: #fff;
    transition-property: transform, visibility;
    transition-duration: 0.45s;
    transform: translate3d(100%, 0, 0);
    border-radius: 0;
    visibility: hidden;
    &.show {
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }
  }

  .panel-title {
    height: 56px;
    background-color: #e8e8e8;
    font-size: 20px;
    line-height: 56px;
    color: rgba(0,0,0,.54);
    text-align: center;
  }

  .panel-row {
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;

    > span {
      font-size: 16px;
    }
  }

  .hide {
    display: none;
  }
</style>