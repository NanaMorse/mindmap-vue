<template>
  <div class="topic" v-bind:style="topicStyle"
       v-on:mouseover="onTopicMouseOver"
       v-on:mouseout="onTopicMouseOut" >
    <span>{{ topicInfo.title }}</span>
    <div class="topic-select-box" v-bind:style="topicSelectBoxStyle"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { State } from 'vuex-class'
  import { TopicShapeType, TopicType } from 'client-src/constants/common'
  import { extendedTopicInfo, stateInfo } from 'client-src/interface'

  const selectBoxToTopicBorderDistance = 5;

  @Component
  class Topic extends Vue {
    @Prop()
    topicInfo: extendedTopicInfo;

    @State((state: stateInfo) => state.map.selectionList)
    selectionList: Array<string>;

    /** @Data */
    isTopicHovering: boolean = false;

    /** @Computed */
    get topicStyle() {
      const { shapeSize, style, position } = this.topicInfo;

      const sizeStyle = {
        width: `${shapeSize.width}px`,
        height: `${shapeSize.height}px`
      };

      const borderStyle = {
        border: `${style.borderWidth}px solid ${style.borderColor}`
      };

      const positionStyle = {
        left: `${position[0] - shapeSize.width / 2}px`,
        top: `${position[1] - shapeSize.height / 2}px`
      };

      return [sizeStyle, borderStyle, positionStyle];
    }

    /** @Computed */
    get isSelectBoxVisible(): boolean {
      const isTopicSelected = this.selectionList.indexOf(this.topicInfo.id) !== -1;
      return isTopicSelected || this.isTopicHovering;
    }

    /** @Computed */
    get topicSelectBoxStyle() {
      const displayStyle = {
        display: this.isSelectBoxVisible ? 'block' : 'none'
      };

      if (!this.isSelectBoxVisible) return [displayStyle];

      const { shapeSize } = this.topicInfo;

      const sizeStyle = {
        width: `${shapeSize.width + selectBoxToTopicBorderDistance * 2}px`,
        height: `${shapeSize.height + selectBoxToTopicBorderDistance * 2}px`
      };

      const isTopicSelected = this.selectionList.indexOf(this.topicInfo.id) !== -1;
      const borderStyle = {
        border: `2px solid ${isTopicSelected ? 'rgb(30, 128, 231)' : 'rgba(30, 128, 231, 0.4)'}`,
        borderRadius: '5px'
      };

      return [displayStyle, sizeStyle, borderStyle];
    }

    onTopicMouseOver() {
      this.isTopicHovering = true;
    }

    onTopicMouseOut() {
      this.isTopicHovering = false;
    }
  }

  export default Topic;

</script>

<style lang="scss" scoped>
  .topic {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .topic-select-box {
    position: absolute;
  }
</style>