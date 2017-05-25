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
  import { getTextSize, deepCopy } from 'client-src/tools/helper'
  import { TopicType } from 'client-src/constants/common'
  import { stageInfo, mapInfo, originTopicInfo, extendedTopicInfo } from 'client-src/interface'

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

    private getExtendedTopicTreeInfo(topicInfo: originTopicInfo): extendedTopicInfo {
      const extendedTopicInfo: extendedTopicInfo = deepCopy(topicInfo) as extendedTopicInfo;

      // get the extended info about it's parent
      this.setExtendedInfoAboutParent(extendedTopicInfo);

      // mix self style and default style
      // extendedTopicInfo.style = Object.assign({});

      return extendedTopicInfo;
    }

    /**
     * @param topicInfo the topic to find parent
     * @param treeLevelToCheck the check level of current check traversal, the start level is the ROOT level
     * @return the parent topic info of a topic node
     * */
    private getParentOfTopicNode(topicInfo: originTopicInfo, treeLevelToCheck: originTopicInfo = this.mapInfo.topicTree): originTopicInfo {
      // if the topicInfo to check is the current check level, it means this topic is the ROOT topic
      if (topicInfo.id === treeLevelToCheck.id) return null;
      // start traversing
      const children = treeLevelToCheck.children;
      if (children) {
        for (const childTreeToCheck of children) {
          if (topicInfo.id === childTreeToCheck.id) return treeLevelToCheck;

          // use depth-first traversal to find the parent
          const parentResult = this.getParentOfTopicNode(topicInfo, childTreeToCheck);
          if (parentResult) return parentResult;
        }
      }
    }

    /**
     * @description such as type/parentId/index
     * */
    private setExtendedInfoAboutParent(topicInfo: extendedTopicInfo) {
      const parent = this.getParentOfTopicNode(topicInfo);

      // set type
      let topicType;
      if (!parent) topicType = TopicType.ROOT;
      else if (!this.getParentOfTopicNode(parent)) topicType = TopicType.MAIN;
      else topicType = TopicType.SUB;
      topicInfo.type = topicType;

      // set parentId
      topicInfo.parentId = parent ? parent.id : null;

      // set index
      topicInfo.index = parent ? parent.children.findIndex(childTopic => childTopic.id === topicInfo.id) : 0;
    }

    private calcTopicSizeInfo() {

    }
  }

  export default Stage
</script>