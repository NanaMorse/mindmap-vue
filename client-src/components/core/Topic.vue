<template>
  <div class="topic" v-bind:style="[borderStyle, sizeStyle, positionStyle]">
    <span>{{ topicInfo.title }}</span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { TopicShapeType, TopicType } from 'client-src/constants/common'
  import { extendedTopicInfo } from 'client-src/interface'

  @Component
  class Topic extends Vue {
    @Prop()
    topicInfo: extendedTopicInfo;

    /** @Computed */
    get sizeStyle() {
      const { shapeSize } = this.topicInfo;

      return {
        width: `${shapeSize.width}px`,
        height: `${shapeSize.height}px`
      }
    }

    /** @Computed */
    get borderStyle() {
      const { style } = this.topicInfo;

      return {
        border: `${style.borderWidth}px solid ${style.borderColor}`
      }
    }

    /** @Computed */
    get positionStyle() {
      const { position, shapeSize } = this.topicInfo;

      const left = position[0] - shapeSize.width / 2;
      const top = position[1] - shapeSize.height / 2;

      return {
        left: `${left}px`,
        top: `${top}px`
      }
    }
  }

  export default Topic;

</script>

<style lang="scss" scoped>
  .topic {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
</style>