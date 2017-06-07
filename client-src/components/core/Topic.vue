<template>
  <div class="topic" v-bind:style="[borderStyle, sizeStyle]">
    <span>{{ topicInfo.title }}</span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { TopicShapeType, TopicType } from 'client-src/constants/common'
  import { extendedTopicInfo } from 'client-src/interface'

  // todo
  const testTopicInfo = {
    id: '1',
    title: 'Hello!',
    style: {
      shapeType: TopicShapeType.RECT,
      borderWidth: 2,
      borderColor: 'red',
    },

    type: TopicType.ROOT,

    size: {
      width: 100,
      height: 50
    }
  };

  @Component
  class Topic extends Vue {
    @Prop()
    topicInfo: extendedTopicInfo;

    /** @Computed */
    get sizeStyle() {
      const { size } = this.topicInfo;

      return {
        width: `${size.width}px`,
        height: `${size.height}px`
      }
    }

    /** @Computed */
    get borderStyle() {
      const { style } = this.topicInfo;

      return {
        border: `${style.borderWidth}px solid ${style.borderColor}`
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