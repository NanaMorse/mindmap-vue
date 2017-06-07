<template>
  <div>
    <div v-for="topicInfo in extendedTopicInfoList">
      <topic v-bind:topicInfo="topicInfo"/>
    </div>
  </div>
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
  import { DefaultTopicStyle } from 'client-src/constants/defaultstyle'
  import { stageInfo, mapInfo, originTopicInfo, extendedTopicInfo } from 'client-src/interface'

  @Component({
    components: {
      'topic': Topic
    }
  })

  class Stage extends Vue {
    @Prop()
    stageInfo: stageInfo;

    @Prop()
    mapInfo: mapInfo;

    /**
     * @description get extended topic info list
     * @Computed
     * */
    get extendedTopicInfoList(): Array<extendedTopicInfo> {
      const extendedTopicInfoList = [];

      const extendedTopicInfoTree = this.getExtendedTopicInfoTree(this.mapInfo.topicTree);

      console.log(extendedTopicInfoTree);

      return extendedTopicInfoList;
    }

    /**
     * @description get extended topic info tree
     * */
    getExtendedTopicInfoTree(topicInfo: originTopicInfo): extendedTopicInfo {
      const extendedTopicInfo: extendedTopicInfo = deepCopy(topicInfo) as extendedTopicInfo;

      // get the extended info about it's parent
      this.setExtendedInfoAboutParent(extendedTopicInfo);

      // mix self style and default style
      extendedTopicInfo.style = Object.assign({}, DefaultTopicStyle[extendedTopicInfo.type], extendedTopicInfo.style);

      // set children's extended info
      if ( extendedTopicInfo.children) {
        extendedTopicInfo.children =  extendedTopicInfo.children.map(childTopicInfo => {
          return this.getExtendedTopicInfoTree(childTopicInfo);
        });
      }

      return extendedTopicInfo;
    }

    /**
     * @param topicInfo the topic to find parent
     * @param treeLevelToCheck the check level of current check traversal, the start level is the ROOT level
     * @return the parent topic info of a topic node
     * */
    getParentOfTopicNode(topicInfo: originTopicInfo, treeLevelToCheck: originTopicInfo = this.mapInfo.topicTree): originTopicInfo {
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
     * @description about type/parentId/index
     * */
    setExtendedInfoAboutParent(topicInfo: extendedTopicInfo) {
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
  }

  export default Stage
</script>