<template>
  <div class="side-panel" :style="panelStyle" :class="{ 'show': app.showSidePanel }">
    <div class="stage-panel" :class="{ 'hide': currentPanelType !== panelType.stage  }">
      <stage-panel />
    </div>
    <div class="topic-panel" :class="{ 'hide': currentPanelType !== panelType.topic  }">
      <topic-panel />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator'
  import { State } from 'vuex-class'
  import StagePanel from './StagePanel.vue'
  import TopicPanel from './TopicPanel.vue'
  import { sidePanelWidth } from 'client-src/constants/defaultstyle'
  import { appInfo, mapInfo } from 'client-src/interface'

  @Component({
    components: {
      'stage-panel': StagePanel,
      'topic-panel': TopicPanel
    }
  })
  class SidePanel extends Vue {

    @State('app') app: appInfo;

    @State('map') map: mapInfo;

    /** @Data */
    panelType = {
      stage: 'stage',
      topic: 'topic'
    };

    /** @Computed */
    get panelStyle() {
      return {
        width: `${sidePanelWidth}px`
      }
    }

    /** @Computed */
    get currentPanelType() {
      const { selectionList } = this.map;

      return selectionList.length ? this.panelType.topic : this.panelType.stage;
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

  .hide {
    display: none;
  }
</style>