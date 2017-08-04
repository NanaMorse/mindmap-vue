<template>
  <div>
    <ui />
    <core :extendedTopicInfoList="extendedTopicInfoList" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { State } from 'vuex-class'
  import UI from './ui'
  import Stage from './core/Stage'
  import LayoutTopics from 'client-src/layout'
  import { defaultTitle, i18n } from 'client-src/constants/i18n'
  import { DefaultTopicStyle, TopicPaddingOverride, DefaultMapStructure } from 'client-src/constants/defaultstyle'
  import { getTextSize, deepCopy, generateUUID, extendedTopicInfoGlobalMap } from 'client-src/tools/helper'
  import { TopicType, TopicTypeToDefaultTitleKeyMap, KeyCodeMap } from 'client-src/constants/common'
  import { mapInfo, extendedTopicInfo, originTopicInfo } from 'client-src/interface'

  @Component({
    components: {
      'core': Stage,
      'ui': UI
    }
  })
  class MindMap extends Vue {

    @State('map') map: mapInfo;

    /**
     * @description get extended topic info list
     * @Computed
     * */
    get extendedTopicInfoList(): Array<extendedTopicInfo> {
      const { topicTree, mapStructure } = this.map;

      const extendedTopicInfoTree = this.getExtendedTopicInfoTree(topicTree);

      LayoutTopics(extendedTopicInfoTree, mapStructure);

      return this.coverTreeInfoToListInfo(extendedTopicInfoTree);
    }

    /** @helper */
    coverTreeInfoToListInfo(topicTreeInfo: extendedTopicInfo): Array<extendedTopicInfo> {
      const extendedTopicInfoList = [];

      extendedTopicInfoGlobalMap.clear();

      function pushTopicData(topicInfo: extendedTopicInfo) {
        extendedTopicInfoList.push(topicInfo);
        extendedTopicInfoGlobalMap.set(topicInfo.id, topicInfo);
        topicInfo.children && topicInfo.children.forEach(child => {
          pushTopicData(child);
        })
      }

      pushTopicData(topicTreeInfo);

      return extendedTopicInfoList;
    }

    /**
     * @description get extended topic info tree
     * @helper
     * */
    getExtendedTopicInfoTree(topicInfo: originTopicInfo): extendedTopicInfo {
      const extendedTopicInfo: extendedTopicInfo = deepCopy(topicInfo) as extendedTopicInfo;

      // get the extended info about it's parent
      this.setTopicInfoAboutParent(extendedTopicInfo);

      // mix self style and default style
      extendedTopicInfo.style = Object.assign({}, DefaultTopicStyle[extendedTopicInfo.type], extendedTopicInfo.style);

      this.setTopicShapeSizeInfo(extendedTopicInfo);

      // set children's extended info
      if ( extendedTopicInfo.children) {
        extendedTopicInfo.children = extendedTopicInfo.children.map(childTopicInfo => {
          return this.getExtendedTopicInfoTree(childTopicInfo);
        });
      }

      return extendedTopicInfo;
    }

    /**
     * @param topicInfo the topic to find parent
     * @param treeLevelToCheck the check level of current check traversal, the start level is the ROOT level
     * @helper
     * @return the parent topic info of a topic node
     * */
    getTopicParentNode(topicInfo: originTopicInfo, treeLevelToCheck: originTopicInfo = this.map.topicTree): originTopicInfo {
      // if the topicInfo to check is the current check level, it means this topic is the ROOT topic
      if (topicInfo.id === treeLevelToCheck.id) return null;
      // start traversing
      const children = treeLevelToCheck.children;
      if (children) {
        for (const childTreeToCheck of children) {
          if (topicInfo.id === childTreeToCheck.id) return treeLevelToCheck;

          // use depth-first traversal to find the parent
          const parentResult = this.getTopicParentNode(topicInfo, childTreeToCheck);
          if (parentResult) return parentResult;
        }
      }
    }

    /**
     * @description about type/parentId/index
     * @helper
     * */
    setTopicInfoAboutParent(topicInfo: extendedTopicInfo) {
      const parent = this.getTopicParentNode(topicInfo);

      // set type
      let topicType;
      if (!parent) topicType = TopicType.ROOT;
      else if (!this.getTopicParentNode(parent)) topicType = TopicType.MAIN;
      else topicType = TopicType.SUB;
      topicInfo.type = topicType;

      // set parentId
      topicInfo.parentId = parent ? parent.id : null;

      // set index
      topicInfo.index = parent ? parent.children.findIndex(childTopic => childTopic.id === topicInfo.id) : 0;
    }

    /** @helper */
    setTopicShapeSizeInfo(topicInfo: extendedTopicInfo) {
      const { type, title, style: { fontSize, shapeType, fontFamily } } = topicInfo;
      const defaultTitle = i18n(TopicTypeToDefaultTitleKeyMap[type]);
      const topicTitleSize = getTextSize(title || defaultTitle, fontSize, fontFamily);

      const shapeSize = { width: 0, height: 0 };
      const { paddingVertical, paddingHorizon } = TopicPaddingOverride[type][shapeType];

      shapeSize.width = topicTitleSize.width + fontSize * paddingHorizon * 2;
      shapeSize.height = topicTitleSize.height + fontSize * paddingVertical * 2;

      topicInfo.shapeSize = shapeSize;
    }
  }

  export default MindMap;
</script>