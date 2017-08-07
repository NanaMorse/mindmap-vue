<template>
  <div class="side-panel" :style="panelStyle" :class="{ 'show': app.showSidePanel }">

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator'
  import { State, Mutation } from 'vuex-class'
  import { sidePanelWidth } from 'client-src/constants/defaultstyle'
  import { appInfo } from 'client-src/interface'

  @Component
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
</style>