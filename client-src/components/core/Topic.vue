<template>
  <div>
    <div class="topic" v-bind:style="topicStyle"
         @mouseover="onTopicMouseOver"
         @mouseout="onTopicMouseOut"
         @click.stop="onTopicClick"
         @dblclick.stop="onTopicDoubleClick">
      <span>{{ topicTitle }}</span>
    </div>
    <div class="topic-select-box" v-bind:style="topicSelectBoxStyle"></div>
    <input class="topic-title-editor" v-bind:style="topicTitleEditorStyle"
           @click.stop=""
           @keyup.enter="onTitleEditorPressEnter"
           @keyup.esc.stop="onTitleEditorPressESC"
           @blur="onTitleEditorBlur"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { State, Mutation } from 'vuex-class'
  import { TopicShapeType, TopicType, TopicTypeToDefaultTitleKeyMap } from 'client-src/constants/common'
  import { EditReceiverMinWidth, EditReceiverHeight } from 'client-src/constants/defaultstyle'
  import { map } from 'client-src/constants/mutations'
  import { extendedTopicInfo, stateInfo } from 'client-src/interface'

  const { selectionEdit, topicTitleEdit } = map;

  const selectBoxToTopicBorderDistance = 5;

  @Component
  class Topic extends Vue {

    $el: HTMLElement;

    $titleEditor: HTMLInputElement;

    @Prop()
    topicInfo: extendedTopicInfo;

    @State((state: stateInfo) => state.map.selectionList)
    selectionList: Array<string>;

    @Mutation(selectionEdit.setSingleSelection) setSingleSelection;

    @Mutation(selectionEdit.addSelectionToList) addSelectionToList;

    @Mutation(selectionEdit.removeSelectionFromList) removeSelectionFromList;

    @Mutation(topicTitleEdit.setTitle) setTitle;

    /** @LifeCircle */
    mounted() {
      this.$titleEditor = this.$el.querySelector('.topic-title-editor') as HTMLInputElement;
    }

    /** @Data */
    isTopicHovering: boolean = false;

    /** @Data */
    isEditing: boolean = false;

    /** @Computed */
    get topicTitle() {
      return this.topicInfo.title || TopicTypeToDefaultTitleKeyMap[this.topicInfo.type]
    }

    /** @Computed */
    get topicStyle() {
      const { shapeSize, style, position } = this.topicInfo;

      const sizeStyle = {
        width: `${shapeSize.width}px`,
        height: `${shapeSize.height}px`
      };

      const borderStyle = {
        border: `${style.borderWidth}px solid ${style.borderColor}`
      };

      const positionStyle = {
        left: `${position[0] - shapeSize.width / 2}px`,
        top: `${position[1] - shapeSize.height / 2}px`
      };

      return [sizeStyle, borderStyle, positionStyle];
    }

    /** @Computed */
    get isSelectBoxVisible(): boolean {
      const isTopicSelected = this.selectionList.indexOf(this.topicInfo.id) !== -1;
      return isTopicSelected || this.isTopicHovering;
    }

    /** @Computed */
    get topicSelectBoxStyle() {
      const displayStyle = {
        display: this.isSelectBoxVisible ? 'block' : 'none'
      };

      if (!this.isSelectBoxVisible) return [displayStyle];

      const { shapeSize, position } = this.topicInfo;

      const width = shapeSize.width + selectBoxToTopicBorderDistance * 2;
      const height = shapeSize.height + selectBoxToTopicBorderDistance * 2;

      const sizeStyle = {
        width: `${width}px`,
        height: `${height}px`
      };

      const isTopicSelected = this.selectionList.indexOf(this.topicInfo.id) !== -1;
      const borderStyle = {
        border: `2px solid ${isTopicSelected ? 'rgb(30, 128, 231)' : 'rgba(30, 128, 231, 0.4)'}`,
        borderRadius: '5px'
      };

      const positionStyle = {
        left: `${position[0] - width / 2}px`,
        top: `${position[1] - height / 2}px`
      };

      return [displayStyle, sizeStyle, borderStyle, positionStyle];
    }

    /** @Computed */
    get topicTitleEditorStyle() {
      const displayStyle = {
        opacity: this.isEditing ? 1 : 0,
        zIndex: this.isEditing ? 1 : -1
      };

      const { shapeSize, position } = this.topicInfo;

      const width = Math.max(shapeSize.width + 60, EditReceiverMinWidth);

      const sizeStyle = {
        width: `${width}px`,
        height: `${EditReceiverHeight}px`
      };

      const positionStyle = {
        left: `${position[0] - width / 2}px`,
        top: `${position[1] - EditReceiverHeight / 2}px`
      };

      return [displayStyle, sizeStyle, positionStyle];
    }

    /** @Listener */
    onTopicMouseOver() {
      this.isTopicHovering = true;
    }

    /** @Listener */
    onTopicMouseOut() {
      this.isTopicHovering = false;
    }

    /** @Listener */
    onTopicClick(e: MouseEvent) {
      this.updateSelection(e);
    }

    /** @Listener */
    onTopicDoubleClick() {
      this.isEditing = true;
      this.$titleEditor.value = this.topicInfo.title || '';
      this.$titleEditor.select();
    }

    /** @Listener */
    onTitleEditorPressEnter(e: KeyboardEvent) {
      if (!this.isEditing) return;

      e.stopPropagation();
      this.$titleEditor.blur();
    }

    /** @Listener */
    onTitleEditorPressESC() {
      if (!this.isEditing) return;
      this.isEditing = false;
      this.$titleEditor.value = '';
    }

    /** @Listener */
    onTitleEditorBlur() {
      if (!this.isEditing) return;

      this.isEditing = false;

      const newTitle = this.$titleEditor.value.trim();

      if (newTitle !== this.topicInfo.title) {
        this.setTitle({ title: newTitle });
      }

      this.$titleEditor.value = '';
    }

    /**
     * @description 更新selection
     * */
    updateSelection(e: MouseEvent) {
      const { id } = this.topicInfo;

      const isPressCtrl = e.metaKey || e.ctrlKey;

      if (this.selectionList.indexOf(id) === -1) {
        if (isPressCtrl) {
          return this.addSelectionToList({ id });
        } else {
          return this.setSingleSelection({ id });
        }
      }

      else if (isPressCtrl) {
        return this.removeSelectionFromList({ id });
      }
    }
  }

  export default Topic;

</script>

<style lang="scss" scoped>
  .topic {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    span {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }

  .topic-select-box {
    position: absolute;
    pointer-events: none;
  }

  .topic-title-editor {
    position: absolute;
  }
</style>