<template>
  <div class="stage"
       @click="onStageClick">
    <div class="topics-container" v-bind:style="canvasStyle"
         @wheel.prevent.stop="onTopicContainerWheel">
      <svg class="lines-container" v-bind:style="canvasStyle">
        <connect-line v-for="topicInfo in extendedTopicInfoList"
                      v-if="topicInfo.children && topicInfo.children.length"
                      :key="topicInfo.id"
                      v-bind:topicInfo="topicInfo"
                      v-bind:mapStructure="map.mapStructure"/>
      </svg>
      <topic v-for="topicInfo in extendedTopicInfoList"
             :key="topicInfo.id"
             v-bind:topicInfo="topicInfo"/>
    </div>
  </div>
</template>

<script lang="ts">
  /**
   * @fileOverview layout all topics
   * */
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'
  import { State, Mutation } from 'vuex-class'
  import Topic from './Topic.vue'
  import Line from './Line.vue'
  import { generateUUID, extendedTopicInfoGlobalMap } from 'client-src/tools/helper'
  import { TopicType, KeyCodeMap } from 'client-src/constants/common'
  import { canvasSize } from 'client-src/constants/defaultstyle'
  import { map } from 'client-src/constants/mutations'
  import { mapInfo, extendedTopicInfo } from 'client-src/interface'

  const { selectionEdit, topicTreeEdit } = map;

  const moveLimitDistance = 100;

  @Component({
    components: {
      'topic': Topic,
      'connect-line': Line
    }
  })

  class Stage extends Vue {

    $el;

    @Prop()
    extendedTopicInfoList: Array<extendedTopicInfo>;

    @State('map') map: mapInfo;

    @Mutation(selectionEdit.clearSelectionList) clearSelectionList;

    @Mutation(topicTreeEdit.addChildTopic) addChildTopic;

    @Mutation(topicTreeEdit.removeTopic) removeTopic;

    /** @LifeCircle */
    mounted() {
      window.addEventListener('keyup', (e: KeyboardEvent) => {
        if (!this.map.selectionList.length) return;

        switch (e.keyCode) {
          case KeyCodeMap.ENTER: return this.onUserPressEnterOnTopic();
          case KeyCodeMap.BACKSPACE: return this.onUserPressDeleteOnTopic();
          case KeyCodeMap.DELETE: return this.onUserPressDeleteOnTopic();
        }
      });

      this.setStageScrollOffset();
    }

    /** @Static */
    startScrollPosition = {
      left: canvasSize.width / 2 - document.body.clientWidth / 2,
      top: canvasSize.height / 2 - (document.body.clientHeight - 64) / 2
    };

    /** @Data */
    stageScrollPosition = { left: canvasSize.width / 2, top: canvasSize.height / 2 };

    /** @Computed */
    get canvasStyle() {
      const sizeStyle = {
        width: `${canvasSize.width}px`,
        height: `${canvasSize.height}px`
      };

      return [sizeStyle];
    }

    /** @Listener */
    onStageClick() {
      this.map.selectionList.length && this.clearSelectionList();
    }

    /** @Listener */
    onTopicContainerWheel(e: WheelEvent) {
      const { left, top } = this.stageScrollPosition;

      const { deltaX, deltaY } = this.fixScrollDelta(e.deltaX, e.deltaY);

      this.stageScrollPosition = { left: left + deltaX, top: top + deltaY };
    }

    /** @Listener */
    onUserPressEnterOnTopic() {
      this.addChildTopic();
    }

    /** @Listener */
    onUserPressDeleteOnTopic() {
      const { selectionList } = this.map;

      if (selectionList.length === 1) {
        const selectionInfo = extendedTopicInfoGlobalMap.get(selectionList[0]);
        if (selectionInfo.type === TopicType.ROOT) return;
      }

      this.removeTopic();
    }

    @Watch('stageScrollPosition')
    setStageScrollOffset() {
      const { left, top } = this.stageScrollPosition;

      this.$el.scrollLeft = left - document.body.clientWidth / 2;
      this.$el.scrollTop = top - (document.body.clientHeight - 64) / 2;
    }

    /** @Helper */
    fixScrollDelta(deltaX: number, deltaY: number) {
      const { startScrollPosition, stageScrollPosition } = this;
      const { clientWidth, clientHeight } = document.body;
      const { shapeSize, treeSize, position } = this.extendedTopicInfoList[0];



//      // 左边超出边界
//      const leftBoundary = startScrollPosition.left +
//        clientWidth / 2 + treeSize.width - moveLimitDistance - shapeSize.width / 2;
//      if ( deltaX > 0 && (stageScrollPosition.left + deltaX > leftBoundary) ) {
//        deltaX = leftBoundary - stageScrollPosition.left;
//      }
//
//      const rightBoundary = startScrollPosition.left -
//        clientWidth / 2;
//      if (deltaX < 0 && (stageScrollPosition.left + deltaX < rightBoundary)) {
//        deltaX = rightBoundary - stageScrollPosition.left;
//      }

      return { deltaX, deltaY }
    }
  }

  export default Stage

</script>

<style lang="scss" scoped>
  .stage {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .topics-container {
    position: relative;
  }

  .lines-container {
    display: block;
  }
</style>