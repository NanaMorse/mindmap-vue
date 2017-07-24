<template>
  <mu-appbar title="MindMap">
    <mu-icon-button icon=":icon-child-topic" slot="right" tooltip="add child topic"
                    v-bind:disabled="shouldChildTopicIconDisabled"
                    @click="onAddSubTopicIconClick"/>
    <mu-icon-button icon=":icon-topic-before" slot="right" tooltip="add topic before"
                    v-bind:disabled="shouldTopicBeforeIconDisabled"/>
    <mu-icon-menu icon="more_vert" slot="right"></mu-icon-menu>
  </mu-appbar>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator'
  import { State, Mutation } from 'vuex-class'
  import { map } from 'client-src/constants/mutations'
  import { mapInfo } from 'client-src/interface'
  import { TopicType } from 'client-src/constants/common'
  import { extendedTopicInfoGlobalMap, generateUUID } from 'client-src/tools/helper'

  const { selectionEdit, topicTreeEdit } = map;

  @Component
  class Header extends Vue {

    @State('map') map: mapInfo;

    @Mutation(selectionEdit.setSingleSelection) setSingleSelection;

    @Mutation(topicTreeEdit.addChildTopic) addChildTopic;

    /** @Computed */
    get shouldChildTopicIconDisabled(): boolean {
      return this.isSelectionEmpty();
    }

    /** @Computed */
    get shouldTopicBeforeIconDisabled(): boolean {
      return this.isSelectionEmpty() || this.isOnlySelectRootTopic();
    }

    /** @Listener */
    onAddSubTopicIconClick() {
      const newTopicId = generateUUID();

      this.addChildTopic({ newTopicInfo: { id: newTopicId } });
      this.setSingleSelection({ id: newTopicId });
    }

    /** @Helper */
    isSelectionEmpty(): boolean {
      return this.map.selectionList.length === 0;
    }

    /** @Helper */
    isOnlySelectRootTopic() {
      const { selectionList } = this.map;
      if (selectionList.length !== 1) return false;

      console.log(extendedTopicInfoGlobalMap, selectionList[0], extendedTopicInfoGlobalMap.get(selectionList[0]))
      // if (extendedTopicInfoGlobalMap.get(selectionList[0]).type === TopicType.ROOT) return true;
    }
  }

  export default Header;

</script>

<style lang="scss" scoped>

</style>