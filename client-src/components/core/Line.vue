<template>
  <path v-bind:d="linePath"/>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { TopicShapeType, TopicType } from 'client-src/constants/common'
  import CalcTopicLine from 'client-src/calcline'
  import { extendedTopicInfo } from 'client-src/interface'

  @Component
  class Line extends Vue {
    @Prop()
    topicInfo: extendedTopicInfo;

    @Prop()
    mapStructure: string;

    /** @Computed */
    get linePath(): string {
      return CalcTopicLine(this.topicInfo, this.mapStructure);
    }

  }

  export default Line;

</script>

<style lang="scss" scoped>
  path {
    stroke: #000;
  }
</style>