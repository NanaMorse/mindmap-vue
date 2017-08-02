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
  import { map, undo } from 'client-src/constants/mutations'
  import { mapInfo, extendedTopicInfo } from 'client-src/interface'

  const { selectionEdit, topicTreeEdit } = map;
  const { invokeUndo, invokeRedo } = undo;

  const headerHeight = 64;
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

    @Mutation(invokeUndo) invokeUndo;

    @Mutation(invokeRedo) invokeRedo;

    /** @LifeCircle */
    mounted() {
      window.addEventListener('keydown', (e: KeyboardEvent) => {
        switch (e.keyCode) {
          case KeyCodeMap.Z: return this.onInvokeUndoOrRedo(e);
        }

        if (!this.map.selectionList.length) return;

        switch (e.keyCode) {
          case KeyCodeMap.ENTER: return this.onUserPressEnterOnTopic();
          case KeyCodeMap.BACKSPACE: return this.onUserPressDeleteOnTopic();
          case KeyCodeMap.DELETE: return this.onUserPressDeleteOnTopic();
        }
      });

      this.setStageScrollOffset();
    }

    /** @Data */
    stageScrollPosition = {
      left: canvasSize.width / 2 - document.body.clientWidth / 2,
      top: canvasSize.height / 2 - (document.body.clientHeight - headerHeight) / 2
    };

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

    /** @Listener */
    onInvokeUndoOrRedo(e: KeyboardEvent) {
      if (e.metaKey) {
        e.shiftKey ?  this.invokeRedo() : this.invokeUndo();
      }
    }

    @Watch('stageScrollPosition')
    setStageScrollOffset() {
      const { left, top } = this.stageScrollPosition;

      this.$el.scrollLeft = left;
      this.$el.scrollTop = top;
    }

    /** @Helper */
    fixScrollDelta(deltaX: number, deltaY: number) {
      const { left, top } = this.stageScrollPosition;
      const { clientWidth, clientHeight } = document.body;
      const { boundingRect } = this.extendedTopicInfoList[0];

      // 左边超出边界
      const leftBoundary = boundingRect.x2 - moveLimitDistance;
      if (deltaX > 0 && (left + deltaX > leftBoundary)) {
        deltaX = leftBoundary - left;
      }

      // 右边超出边界
      const rightBoundary = boundingRect.x1 - clientWidth + moveLimitDistance;
      if (deltaX < 0 && (left + deltaX < rightBoundary)) {
        deltaX = rightBoundary - left;
      }

      // 上边超出边界
      const topBoundary = boundingRect.y2 - moveLimitDistance - headerHeight;
      if (deltaY > 0 && (top + deltaY > topBoundary)) {
        deltaY = topBoundary - top;
      }

      // 下边超出边界
      const bottomBoundary = boundingRect.y1 - clientHeight + moveLimitDistance;
      if (deltaY < 0 && (top + deltaY < bottomBoundary)) {
        deltaY = bottomBoundary - top;
      }

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