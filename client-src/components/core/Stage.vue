<template>
  <div class="stage"
       v-on:click="onStageClick">
    <div class="topics-container">
      <topic v-for="topicInfo in extendedTopicInfoList"
             :key="topicInfo.id"
             v-bind:topicInfo="topicInfo"/>
    </div>
    <svg class="lines-container">
      <connect-line v-for="topicInfo in extendedTopicInfoList"
            v-if="topicInfo.children && topicInfo.children.length"
            :key="topicInfo.id"
            v-bind:topicInfo="topicInfo"
            v-bind:mapStructure="map.mapStructure"/>
    </svg>
  </div>
</template>

<script lang="ts">
  /**
   * @fileOverview layout all topics
   * */
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { State, Mutation } from 'vuex-class'
  import Topic from './Topic.vue'
  import Line from './Line.vue'
  import { generateUUID, extendedTopicInfoGlobalMap } from 'client-src/tools/helper'
  import { TopicType, KeyCodeMap } from 'client-src/constants/common'
  import { map } from 'client-src/constants/mutations'
  import { mapInfo, extendedTopicInfo } from 'client-src/interface'

  const { selectionEdit, topicTreeEdit } = map;

  @Component({
    components: {
      'topic': Topic,
      'connect-line': Line
    }
  })

  class Stage extends Vue {

    @Prop()
    extendedTopicInfoList: Array<extendedTopicInfo>;

    @State('map') map: mapInfo;

    @Mutation(selectionEdit.setSingleSelection) setSingleSelection;

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
    }

    /** @Listener */
    onStageClick() {
      this.map.selectionList.length && this.clearSelectionList();
    }

    /** @Listener */
    onUserPressEnterOnTopic() {
      const newTopicId = generateUUID();

      this.addChildTopic({ newTopicInfo: { id: newTopicId } });
      this.setSingleSelection({ id: newTopicId });
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
  }

  export default Stage

</script>

<style lang="scss" scoped>
  .stage {
    width: 100vw;
    height: 100vh;
  }

  .topics-container {
    position: relative;
  }

  .lines-container {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>