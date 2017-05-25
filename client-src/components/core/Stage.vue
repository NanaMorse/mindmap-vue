<template>
  <topic />
</template>

<script lang="ts">
  /**
   * @fileOverview layout all topics
   * */
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import Topic from './Topic.vue'
  import { stageInfo, mapInfo } from 'client-src/interface'

  @Component({
    components: {
      'topic': Topic
    }
  })

  class Stage extends Vue {
    @Prop()
    private stageInfo: stageInfo;

    @Prop()
    private mapInfo: mapInfo;


  }

  export default Stage
</script>