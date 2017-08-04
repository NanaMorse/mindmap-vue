<template>
  <div class="side-panel" :class="{ 'show': show }">

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator'

  @Component
  class SidePanel extends Vue {

    @Prop()
    show: boolean;

  }

  export default SidePanel;
</script>

<style lang="scss" scoped>
  .side-panel {
    width: 256px;
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