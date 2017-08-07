<template>
  <mu-appbar class="app-header" title="MindMap">
    <mu-icon-button icon="undo" slot="right" tooltip="undo"
                    :disabled="!app.hasUndo"
                    @click="invokeUndo"/>
    <mu-icon-button icon="redo" slot="right" tooltip="redo"
                    :disabled="!app.hasRedo"
                    @click="invokeRedo"/>
    <mu-icon-button icon=":icon-child-topic" slot="right" tooltip="add child topic"
                    :disabled="isSelectionEmpty()"
                    @click="addChildTopic"/>
    <mu-icon-button icon=":icon-parent-topic" slot="right" tooltip="add parent topic"
                    :disabled="isSelectionEmpty() || isLatestSelectRootTopic()"
                    @click="addParentTopic"/>
    <mu-icon-button icon=":icon-topic-before" slot="right" tooltip="add topic before"
                    :disabled="isSelectionEmpty() || isLatestSelectRootTopic()"
                    @click="addTopicBefore"/>
    <mu-icon-button icon=":icon-topic-after" slot="right" tooltip="add topic after"
                    :disabled="isSelectionEmpty() || isLatestSelectRootTopic()"
                    @click="addTopicAfter"/>
    <mu-icon-button icon=":icon-remove-topic" slot="right" tooltip="remove topic"
                    :disabled="isSelectionEmpty() || isLatestSelectRootTopic()"
                    @click="removeTopic"/>
    <mu-icon-button icon="style" slot="right" @click="toggleSidePanel" />
  </mu-appbar>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator'
  import { State, Mutation } from 'vuex-class'
  import { map, undo, app } from 'client-src/constants/mutations'
  import { mapInfo, appInfo } from 'client-src/interface'
  import { TopicType } from 'client-src/constants/common'
  import { extendedTopicInfoGlobalMap, generateUUID } from 'client-src/tools/helper'

  const { topicTreeEdit } = map;
  const { invokeUndo, invokeRedo } = undo;
  const { toggleSidePanel } = app;

  @Component
  class Header extends Vue {

    @State('app') app: appInfo;

    @State('map') map: mapInfo;

    @Mutation(topicTreeEdit.addChildTopic) addChildTopic;

    @Mutation(topicTreeEdit.addParentTopic) addParentTopic;

    @Mutation(topicTreeEdit.addTopicBefore) addTopicBefore;

    @Mutation(topicTreeEdit.addTopicAfter) addTopicAfter;

    @Mutation(topicTreeEdit.removeTopic) removeTopic;

    @Mutation(invokeUndo) invokeUndo;

    @Mutation(invokeRedo) invokeRedo;

    @Mutation(toggleSidePanel) toggleSidePanel;

    /** @Helper */
    isSelectionEmpty(): boolean {
      return this.map.selectionList.length === 0;
    }

    /** @Helper */
    isLatestSelectRootTopic(): boolean {
      const { selectionList } = this.map;
      if (!selectionList.length) return false;

      const currentSelectionTopicInfo = extendedTopicInfoGlobalMap.get(selectionList[selectionList.length - 1]);
      return currentSelectionTopicInfo.type === TopicType.ROOT;
    }
  }

  export default Header;

</script>

<style lang="scss" scoped>
  .app-header {
    position: absolute;
  }
</style>